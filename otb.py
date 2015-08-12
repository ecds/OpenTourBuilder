"""
Scrit to install and configre OpenTourBuilder
"""
from sys import version_info
import platform
import subprocess
import getpass
import os

from fabric.api import task, puts, local
from fabric.colors import green, red
from fabric.operations import prompt
# from fabric.context_managers import cd, hide, settings
# from fabric.contrib import files
# from fabric.contrib.console import confirm

try:
    import MySQLdb
except ImportError:
    puts(red("Python module mysql-python is not installed.\nPlease ask you system's administrator to install it."))
    exit()

# Git Hub repo for the server
REPO = 'https://github.com/emory-libraries-ecds/OpenTourBuilder-Server.git'

OTB_DIR = os.getcwd() + '/OpenTourBuilder-Server/'

def check_platform():
    """
    Check to see what platfom we are running
    """
    return platform.dist()[0]

def check_python_version():
    """
    Need to write a docstring
    """
    python_version = float('%s.%s' % (version_info[0], version_info[1]))
    if python_version < 2.7 or python_version >= 3:
        puts(red("Python 2.7 is required. Please check \
                with your system administrator."))
        exit()

    else:
        puts(green("Good, Python version is 2.7."))
        return True

def check_packages(current_platform):
    """
    We need to see if the system has:
        * build-essential
            * dpkg -s build-essential | grep Status
        * mysql-client
            * dpkg -s mysql-client | grep Status
        * python-dev
            * dpkg -s python-dev | grep Status
        * libmysqlclient-dev
            * dpkg -s libmysqlclient-dev | grep Status
        * libjpeg
            * dpkg -s libjpeg8-dev | grep Status
        * zlib
            * dpkg -s zlib1g-dev | grep Status
        * pip
            * pip -V
        * virtualevn
            * virtualenv --version
        * git
            * dpkg -s git | grep Status
    """
    # We're going to handle pip a little differently as it is likely
    # pip was not installed via the system's package manager.
    pip = subprocess.check_output(["pip", "-V"])

    if current_platform.lower() == 'ubuntu':

        try:
            subprocess.check_output(
                ["dpkg", "-s", "build-essential"], stderr=subprocess.PIPE)
        except subprocess.CalledProcessError:
            puts(red('Cannot verify build-essential is installed.'))

        try:
            subprocess.check_output(
                ["dpkg", "-s", "python-dev"], stderr=subprocess.PIPE)
        except subprocess.CalledProcessError:
            puts(red('Cannont verify python-dev is installed.'))

        try:
            subprocess.check_output(
                ["dpkg", "-s", "libjpeg8-dev"], stderr=subprocess.PIPE)
        except subprocess.CalledProcessError:
            puts(red('Cannont verify libjpeg8-dev is installed.'))

        try:
            subprocess.check_output(
                ["dpkg", "-s", "zlib1g-dev"], stderr=subprocess.PIPE)
        except subprocess.CalledProcessError:
            puts(red('Cannont verify zlib-dev is installed.'))

        # See above note about why the pip check is different
        if 'not installed' in pip:
            puts(red("Cannont verify python-pip is installed."))

    elif current_platform.lower() == 'redhat' \
        or current_platform.lower() == 'centos':

        try:
            subprocess.check_output(
                "rpm -qa | grep python-devel", shell=True, stderr=subprocess.PIPE)
        except subprocess.CalledProcessError:
            puts(red('Cannont verify python-devel is installed.'))

        try:
            subprocess.check_output(
                "rpm -qa | grep libjpeg", shell=True, stderr=subprocess.PIPE)
        except subprocess.CalledProcessError:
            puts(red('Cannont verify libjpeg-devel is installed.'))

        try:
            subprocess.check_output(
                "rpm -qa | grep libzip-devel", shell=True, stderr=subprocess.PIPE)
        except subprocess.CalledProcessError:
            puts(red('Cannont verify libzip-devel is installed.'))

        # See above note about why the pip check is different
        if 'not installed' in pip:
            puts(red("Cannont verify python-pip is installed."))

    else:
        puts(red("Cannot determine that the server's operating \
            system is supported"))

def check_mysql_connection(user, password, host, database, port):
    """
    Check that the MySQL connection works.
    """

    try:
        # If the port is the default we're going to leave it out of the config
        # as most databases don't 
        if port != '3306':
            dbase = MySQLdb.connect(
                host=host, port=port, user=user, passwd=password, db=database)
        else:
            dbase = MySQLdb.connect(
                host=host, user=user, passwd=password, db=database)
        cursor = dbase.cursor()
        cursor.execute("SELECT VERSION()")
        results = cursor.fetchone()
        # Check if anything at all is returned
        if results:
            puts(green("MySQL connection successful."))
            return True
        else:
            return False
    except MySQLdb.Error:
        puts(red("ERROR IN CONNECTION"))
    return False

def clone():
    """
    Clone the server from Git Hub.
    """
    puts(green("Downloading OpenTourBuilder-Server from Git Hub."))
    subprocess.call(['git', 'clone', REPO], stderr=subprocess.PIPE)

def activate_venv():
    """
    Activate the virtualenv
    """
    local('source %svenv/bin/activate' % OTB_DIR)

def setup_virtual_env():
    """
    Create the virtualenv.
    """
    local('cd %s; virtualenv venv --no-site-packages' % OTB_DIR)


def all_deps():
    '''Locally install all dependencies.'''
    activate_venv()
    local('pip install -r %srequirements.txt' % (OTB_DIR))


def create_local_settings(user, password, host, database, port):
    """
    Take the user supplied databae info and create the
    local settings.
    """
    local_settings = open('%stours/settings/local.py' % OTB_DIR, 'w+')

    for line in open('local.py.dist', 'r'):
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
    activate_venv()
    local('python %smanage.py collect_static --noinput' % OTB_DIR)
    local('python %smanage.py syncdb' % OTB_DIR)
    local('python %smanage.py migrate' % OTB_DIR)

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

    puts(green('\n\n\nOK, looking good. Now let\'s configure our settings.'))

    db_host = prompt("Enter the address of your database server. ", default="localhost")
    db_user = prompt("Enter your database user name. ")
    db_password = getpass.getpass("Enter your database user's password. ")
    db_database = prompt("Enter the name of your database. ")
    db_port = prompt("Enter the port for the database. ", default="3306")

    check_mysql_connection(db_user, db_password, db_host, db_database, db_port)
    create_local_settings(db_user, db_password, db_host, db_database, db_port)
