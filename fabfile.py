"""
Script to install and configre OpenTourBuilder
"""
from sys import version_info, stdout
import platform
import subprocess
import getpass
import os
import time
from __future__ import with_statement


from fabric.api import task, puts, local
from fabric.colors import green, red
from fabric.operations import prompt
# from fabric.context_managers import cd, hide, settings
# from fabric.contrib import files
# from fabric.contrib.console import confirm

# Git Hub repo for the server
UBUNTU_PACKAGES = ['build-essential','python-dev','python-setuptools','libjpeg8-dev','zlib1g-dev','mysql-server','python-mysqld','libmysqlclient-dev']
REDHAT_PACKAGES = ['python-devel','python-setuptools','libjpeg','libzip-devel','mysql-server']

REPO = 'https://github.com/emory-libraries-ecds/OpenTourBuilder-Server.git'

OTB_DIR = os.getcwd() + '/OpenTourBuilder-Server/'

# how long does the process run
class ProcessRunning:

    def process_start(process):
        for i in range(1000):
            time.sleep(1)
            sys.stdout.write(process + "\r has been running for %d seconds" % i)
            sys.stdout.flush()

    def process_stop(process):
        p = process + " is done!"
        return p



# auto install a package if a user wants to do so
def install_package(package, platform):
    install = prompt("Do you want to install " + package + "? (yes/no)")
    if install[0].lower() == "y" and platform == "ubuntu":
        ProcessRunning.process_start(package)
        local('sudo apt-get install ' + package)
        ProcessRunning.process_stop(package)
    
    elif install[0].lower() == "y" and (platform == "centos" or platform == "redhat"):
        ProcessRunning.process_start(package)
        local('sudo yum install ' + package)
        ProcessRunning.process_stop(package)

    elif install[0].lower() == "n" and platform == "ubuntu"::
        puts(red('Please, manually install these package before running this script again: sudo apt-get install -y ' + package))
        exit()
    elif install[0].lower() == "n" and (platform == "centos" or platform == "redhat"):
        puts(red('Please, manually install this package before running this script again: sudo yum install ' + package))
        exit()
    else:
        puts(red('Please, manually install required package before running this script again' + package)
        exit()


def check_platform():
    """
    Check to see what platfom we are running
    """
    puts(green("Checking your platform..."))
    return platform.dist()[0]

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
    pip = subprocess.check_output(["pip", "-V"])

    if current_platform.lower() == 'ubuntu':
        for i, val in enumerate(UBUNTU_PACKAGES):
            
            ProcessRunning.process_start(val)
            try:
                subprocess.check_output(
                    ["dpkg", "-s", val], stderr=subprocess.PIPE)
            except subprocess.CalledProcessError:
                install_package(val,current_platform)
            ProcessRunning.process_stop(val)


    elif current_platform.lower() == 'redhat' \
        or current_platform.lower() == 'centos':

        for i, val in enumerate(REDHAT_PACKAGES):

            ProcessRunning.process_start(val)
            try:
                subprocess.check_output(
                    "rpm -qa | grep " + val, shell=True, stderr=subprocess.PIPE)
            except subprocess.CalledProcessError:
                install_package(val,current_platform)
            ProcessRunning.process_stop(val)

    else:
        puts(red("Cannot determine that the server's operating \
            system is supported"))

    # See above note about why the pip check is different and if it is not different then install virtualenv
    if 'not installed' in pip:
        install_package('python-pip',current_platform)
        local("sudo pip install virtualenv")
    else:
        local("sudo pip install virtualenv")

def check_mysql_connection(user, password, host, database, port, current_platform):
    """
    Check that the MySQL connection works.
    """
    package = "mysql-python"

    ProcessRunning.process_start(package)
    try:
        import MySQLdb
    
    except ImportError:
        
        install_package(package,current_platform)

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
        puts(red("Install cannot continue without valid database connection."))
        puts(red("Please verify your database credentials and try again."))
        exit()
    ProcessRunning.process_stop(package)
    return False

def clone():
    """
    Clone the server from Git Hub.
    """
    puts(green("Downloading OpenTourBuilder-Server from GitHub."))
    local('git clone %s -b feature/api' % REPO)

def activate_venv(cmd):
    """
    Activate the virtualenv
    """
    local('source %svenv/bin/activate; %s' % (OTB_DIR, cmd))

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
    puts(green("Running the magage commads to get the application setup"))
    activate_venv('python %smanage.py collectstatic --noinput' % OTB_DIR)
    activate_venv('python %smanage.py syncdb' % OTB_DIR)
    #activate_venv('python %smanage.py migrate' % OTB_DIR)

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

    check_mysql_connection(db_user, db_password, db_host, db_database, db_port, current_platform)
    create_local_settings(db_user, db_password, db_host, db_database, db_port)

    setup_application()

@task
def check_for_dependencies():
    current_platform = check_platform()
    check_python_version()
    check_packages(current_platform)
