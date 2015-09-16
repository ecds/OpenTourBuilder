"""
Script to install and configre OpenTourBuilder
"""
from __future__ import with_statement
from sys import version_info, stdout
import platform
import subprocess
import getpass
import os
from random import choice
from string import lowercase
from shutil import rmtree, move
import urllib
import tarfile

from fabric.api import task, puts, local
from fabric.colors import green, red, cyan
from fabric.operations import prompt
from fabric.context_managers import prefix, lcd

# List of system packages
UBUNTU_PACKAGES = [
    'build-essential',
    'libjpeg8-dev',
    'zlib1g-dev',
    'libmysqlclient-dev',
    'mysql-client',
    'git'
]
REDHAT_PACKAGES = [
    'gcc',
    'libjpeg-devel',
    'libzip',
    'mysql',
    'mysql-devel',
    'git'
]

# Git Hub repo for the server
REPO = 'https://github.com/emory-libraries-ecds/OpenTourBuilder-Server.git'

PARENT_DIR = os.sep.join(os.getcwd().split(os.sep)[:-1])
OTB_DIR = '%s/OpenTourBuilder-Server/' % PARENT_DIR
CLIENT_DIR = '%s/OpenTourBuilder-Client/' % PARENT_DIR

def activate_venv(cmd):
    """
    Activate the virtualenv
    """
    with prefix('source %svenv/bin/activate' % OTB_DIR):
        local(cmd, shell='/bin/bash')


# auto install a package if a user wants to do so
def install_package(package, platform):

    install = prompt("\n\nDo you want to install " + package + "? (yes/no)")

    if install[0].lower() == "y" and platform == "ubuntu":
        puts(green('\nTrying to install ' + package))
        local('sudo apt-get install -y ' + package)
        puts(green('\nDone installing ' + package))

    elif install[0].lower() == "y" and (platform == "centos" or platform == "redhat"):
        puts(green('\nTrying to install ' + package))
        local('sudo yum install -y ' + package)
        puts(green('\nDone installing ' + package))

    elif install[0].lower() == "n" and platform == "ubuntu":
        puts(red('Please, manually install these package before running this script again: sudo apt-get install ' + package))
        exit()
    elif install[0].lower() == "n" and (platform == "centos" or platform == "redhat"):
        puts(red('Please, manually install this package before running this script again: sudo yum install ' + package))
        exit()
    else:
        puts(red('Please, manually install required package before running this script again ' + package))
        exit()


def check_platform():
    """
    Check to see what platfom we are running
    """
    puts(green("Checking your platform..."))
    return platform.dist()[0].lower()

def check_python_version():
    """
    Need to write a docstring
    """
    python_version = float('%s.%s' % (version_info[0], version_info[1]))
    if python_version < 2.7 or python_version >= 3:
        puts(red("Python 2.7 is required. Please check with your system administrator."))
        exit()

    else:
        puts(green("Good, Python version is 2.7."))




def check_packages(current_platform):
    """
    We need to see if the system has:
        build-essential, mysql-client, python-dev, libmysqlclient-dev, \
        libjpeg, zlib, pip, virtualevn and git
    """
    # We're going to handle pip a little differently as it is likely
    # pip was not installed via the system's package manager.
    puts(green('Checking if all necessary packages are installed...'))
    pip = subprocess.check_output(["pip", "-V"])
    length = len(UBUNTU_PACKAGES)
    length2 = len(REDHAT_PACKAGES)
    if current_platform.lower() == 'ubuntu':
        for i, val in enumerate(UBUNTU_PACKAGES):
            stdout.write("\r Currently checking" + val + ". Progress: %d/%d packages" %(i,length))
            stdout.flush()
            try:
                subprocess.check_output(
                    ["dpkg", "-s", val], stderr=subprocess.PIPE)
            except subprocess.CalledProcessError:
                install_package(val, current_platform)



    elif current_platform.lower() == 'redhat' \
        or current_platform.lower() == 'centos':

        for i, val in enumerate(REDHAT_PACKAGES):
            stdout.write("\r Currently checking" + val + ". Progress: %d/%d packages" %(i,length2))
            stdout.flush()
            try:
                subprocess.check_output(
                    "rpm -qa | grep " + val, shell=True, stderr=subprocess.PIPE)
            except subprocess.CalledProcessError:
                install_package(val, current_platform)


    else:
        puts(red("Cannot determine that the server's operating \
            system is supported"))

    # See above note about why the pip check is different and if it is not different then install virtualenv
    if 'not installed' in pip:
        install_package('python-pip', current_platform)
        local("sudo pip install virtualenv")
    else:
        local("sudo pip install virtualenv")

def check_mysql_connection(user, password, host, database, port):
    """
    Check that the MySQL connection works.
    """
    # MySQLdb is installed from the pip file so we don't want to
    # import it until now.
    import MySQLdb

    puts(green("Checking MySQL connection and packages"))

    try:
        dbase = MySQLdb.connect(
            host=host, port=int(port), user=user, passwd=password, db=database)

        cursor = dbase.cursor()
        cursor.execute("SELECT VERSION()")
        results = cursor.fetchone()
        # Check if anything at all is returned
        if results:
            puts(green("MySQL connection successful."))
    except:
        puts(red("ERROR IN CONNECTION"))
        puts(red("Install cannot continue without valid database connection."))
        puts(red("Please verify your database credentials and try again."))
        exit()
    puts(green("You are connected to MySQL Server"))
    return False

def clone():
    """
    Clone the server from Git Hub.
    """
    if os.path.exists(OTB_DIR):
        rmtree(OTB_DIR)

    puts(green("Downloading OpenTourBuilder-Server from GitHub."))

    with lcd('../'):
        local('git clone %s -b develop' % REPO, shell='/bin/bash')

def setup_virtual_env():
    """
    Create the virtualenv.
    """
    puts(green("Setting up Virtual Environment"))
    local('cd %s; virtualenv venv --no-site-packages' % OTB_DIR)


def all_deps():
    '''Locally install all dependencies.'''
    puts(green("Installing all dependencies"))
    activate_venv('pip install -r %srequirements.txt' % (OTB_DIR))


def create_local_settings(user, password, host, database, port):
    """
    Take the user supplied database info and create the
    local settings.
    """
    puts(green("Creating local settings..."))
    local_settings = open('%stours/settings/local.py' % OTB_DIR, 'w+')

    for line in open('%stours/settings/local.py.dist' % OTB_DIR, 'r'):
        line = line.replace('$db_user', user)
        line = line.replace('$db_password', password)
        line = line.replace('$db_host', host)
        line = line.replace('$db_database', database)
        line = line.replace('$db_port', port)
        local_settings.write(line)

def setup_application():
    """
    Run the magage commads to get the application running
    """
    puts(green("Running the magage commads to get the application setup"))
    activate_venv('python %smanage.py syncdb' % OTB_DIR)
    activate_venv('python %smanage.py loaddata tours' % OTB_DIR)
    if not os.path.exists('%stours/sitemedia' % OTB_DIR):
        os.makedirs('%stours/sitemedia' % OTB_DIR)
    activate_venv('python %smanage.py collectstatic --noinput' % OTB_DIR)

def apache_config(domain):
    """
    Create a sample Apache config for the user.
    $path = OTB_DIR
    $domain # will need to add `api.` for django
    $proc = maybe 4 random chars
    $client-path = CLIENT_DIR
    """

    # Just incase the user put in the domain like `http://awesometour.com`
    domain = domain.replace("http://", "").strip("/")

    # A short set of random characters to append to the name of the
    # wsgi process name
    proc = ''.join(choice(lowercase) for i in range(4))

    puts(green("Creating sample Apache config..."))
    config_file = open('%sapache/otb.conf' % OTB_DIR, 'w+')

    for line in open('%sapache/otb.conf.dist' % OTB_DIR, 'r'):
        line = line.replace('$path', OTB_DIR)
        line = line.replace('$domain', domain)
        line = line.replace('$proc', proc)
        line = line.replace('$client-path', CLIENT_DIR)
        config_file.write(line)

def setup_client(domain, title):
    """
    Download tar ball from github, upack it and set it up.
    """
    if os.path.exists(CLIENT_DIR):
        rmtree(CLIENT_DIR)
    os.makedirs(CLIENT_DIR)
    urllib.urlretrieve("https://github.com/emory-libraries-ecds/OpenTourBuilder-Client/releases/download/1.0.0/OpenTourBuilder-Client.tar.gz", "%sOpenTourBuilder-Client.tar.gz" % CLIENT_DIR)

    tar = tarfile.open('%sOpenTourBuilder-Client.tar.gz' % CLIENT_DIR)
    tar.extractall(CLIENT_DIR)
    tar.close()

    js_file = '%sassets/open-tour-builder-ember.js' % CLIENT_DIR
    tmp_js_file = 'tmp.js'
    move(js_file, tmp_js_file)
    new_js = open(js_file, 'w+')
    for line in open(tmp_js_file, 'r'):
        line = line.replace('$api-host', 'api.%s' % domain)
        new_js.write(line)
    os.remove(tmp_js_file)

    index_file = '%sindex.html' % CLIENT_DIR
    tmp_index_file = 'tmp.html'
    move(index_file, tmp_index_file)
    new_index = open(index_file, 'w+')
    for line in open(tmp_index_file, 'r'):
        line = line.replace('$tour-title', title)
        new_index.write(line)
    os.remove(tmp_index_file)

@task
def install():
    """
    Task to run all the install tasks.
    """

    current_platform = check_platform()
    check_python_version()
    check_packages(current_platform)

    clone()

    setup_virtual_env()
    all_deps()

    puts(green('\nOK, looking good. Now let\'s configure our settings.'))

    db_host = prompt("Enter the address of your database server. ", default="localhost")
    db_user = prompt("Enter your database user name. ")
    db_password = getpass.getpass("Enter your database user's password. ")
    db_database = prompt("Enter the name of your database. ")
    db_port = prompt("Enter the port for the database. ", default="3306")

    check_mysql_connection(db_user, db_password, db_host, db_database, db_port)
    create_local_settings(db_user, db_password, db_host, db_database, db_port)

    setup_application()

    domain = prompt("Enter the domain for your site. [example: myawesometour.com] ")
    title = prompt("Enter the tilte of you tour. [example: My Awesome Tour] ")

    apache_config(domain)

    setup_client(domain, title)

@task
def client():
    setup_client('myawesometour.com', 'My Awesome Tour')

@task
def check_for_dependencies():
    current_platform = check_platform()
    check_python_version()
    check_packages(current_platform)

    puts(green("\nOK you're all set. now run the following:"))
    puts(cyan("fab install"))
