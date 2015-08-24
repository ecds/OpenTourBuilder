# OpenTourBuilder Installer
This is a [Python Fabric](http://www.fabfile.org/) script that aims to automate much of the system configuration needed to install and deploy the OpenTourBuilder stack.

Currently, the only server platforms supported by this script are Ubuntu, Red Hat and CentOS. The installer also provides a sample Apache configuration file. Support for other web servers is currently beyond the scope of this installer.
> We highly recommend you use Ubuntu. Current versions of Red Hat and CentOS ship with older versions of Python and will require you to install an alternative version of Python. OpenTourBuilder requires Python 2.7. You cannot replace the system's Python or you will break <code>yum</code>. There are many ways to [install](https://github.com/yyuu/pyenv) and [run](http://developerblog.redhat.com/2013/02/14/setting-up-django-and-python-2-7-on-red-hat-enterprise-6-the-easy-way/) [alternative](https://github.com/h2oai/h2o-2/wiki/Installing-python-2.7-on-centos-6.3.-Follow-this-sequence-exactly-for-centos-machine-only) versions of Python.

OpenTourBuilder has two parts. The [OpenTourBuilder Server](https://github.com/emory-libraries-ecds/OpenTourBuilder-Server) developed in [Python Django](https://www.djangoproject.com/) and the [OpenTourBuilder Client](https://github.com/emory-libraries-ecds/OpenTourBuilder-Client) developed in [Ember JS](http://emberjs.com/). 

## What you need to do before starting the install

You will need:

* A server running Ubuntu, Red Hat or CentOS (see note above)

* Access and credentials to a MySQL database
	* Username
	* Password
	* Name of database
	* Hostname (defaults to localhost)
	* Port

### Install a few things
Thes packages may have already been installed but let's just make sure by running the following comands.
#### Ubuntu
<code>sudo apt-get install -y python-setuptools python-dev git libmysqlclient-dev mysql-client</code>

<code>sudo easy_install pip</code>

<code>sudo pip install fabric MySQL-python</code>

#### Red Hat/CentOS
<code>sudo yum install -y python-setuptools python-devel git mysql mysql-devel</code>

<code>sudo easy_install pip</code>

<code>sudo pip install fabric MySQL-python</code>
	
## Download the installer
Navigate to the directory where you want to install OpenTourBuilder and download the installer from [GitHub](https://github.com/emory-libraries-ecds/OpenTourBuilder-Installer).

<code>git clone https://github.com/emory-libraries-ecds/OpenTourBuilder-Installer.git</code>

Change to the installer directory:

<code>cd OpenTourBuilder-Installer</code>


## Check your system for dependencies
	
Run the following command to check whether you have all dependencies installed. If the dependencies are not installed, you will be prompted to install them automatically. **YOU MUST HAVE SUDO ACCESS TO THE SERVER**.

<code>fab check_for_dependencies</code>

## Run the installer
<code>fab install</code>

While the installer is running you will be promted for the following information:

* The password for your user on the system (maybe)
* The address for your MySQL database. Examples:
	* localhost
	* mydatabaseserver.com
* Database username
* Database password
* Name of database
* Port for database server (defaults to 3306)
* You will be asked to set up a user for the Djano Admin. This can be whatever you want.
* Fully qualified domain name

## After the installer runs
After the installer sucessfully runs, yoy will need to navigate up one directory to see the files.

<code>cd ../</code>

If you list the contents on the directory (by running <code>ls</code>) you will see a dirctory that contains all the files for the the server and the client.

* OpenTourBuilder-Server
* OpenTourBuilder-Client

You will find a sample [Apache](http://httpd.apache.org/) config file; *OpenTourBuilder-Server/apache/otb.conf*. The sample config assumes you have *mod_wsgi* installed and enabled.

Providing configs to deploy OpenTourBuilder using other web servers is beyond the current scope of the installer.





