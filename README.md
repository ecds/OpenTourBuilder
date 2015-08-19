# OpenTourBuilder Installer
This is a python [Python Fabric](http://www.fabfile.org/) script that aims to automate much of the system configuration to install and deploy OpenTourBuilder.

Curently, the only server platforms supported by this script are Ubuntu and Red Hat (and CentOS).

OpenTourBuilder has two parts. The [OpenTourBuilder Server](https://github.com/emory-libraries-ecds/OpenTourBuilder-Server) developed in [Python Django](https://www.djangoproject.com/) and the [OpenTourBuilder Client](https://github.com/emory-libraries-ecds/OpenTourBuilder-Client) developed in [Ember JS](http://emberjs.com/). 

## What You Need to do Before Starting the Install

You will need:

* A server running Ubuntu, Red Hat or CentOS
> We highly recomend you use Ubuntu. Current Versions of Red Hat and CentOS ship with older versions of Python and will require you to install and alternative version of Python. OpenTourBuilder requires Python 2.7. You cannot replace the system's Python or you will break yum. There are many ways to [install](https://github.com/yyuu/pyenv) and [run](http://developerblog.redhat.com/2013/02/14/setting-up-django-and-python-2-7-on-red-hat-enterprise-6-the-easy-way/) [alternative](https://github.com/h2oai/h2o-2/wiki/Installing-python-2.7-on-centos-6.3.-Follow-this-sequence-exactly-for-centos-machine-only) versions of Python.

* Access and credentials to a MySQL database
	* User
	* Password
	* Name of database
	* Hostname
	* Port
* Python Fabric installed
<code>pip install fabric</code>
* The fully qulaified domain name of your site eg. myawesometour.com
* Install Git
	* Ubuntu
		<code>sudo apt-get install git</code>
	* Red Hat/CentOS
	<code>sudo yum install git</code>
	
## Download the installer
Navigate to the directory where you want the install OpenTourBuilder and download the installer from [GitHub](https://github.com/emory-libraries-ecds/OpenTourBuilder-Installer).

<code>git clone https://github.com/emory-libraries-ecds/OpenTourBuilder-Installer.git</code>


## Check your systme for dependencies
Check whether you have all dependencies installed or not. If the dependencies are not installed it should pormpt you install them automatically. YOU HAVE TO HAVE SUDO ACCESS TO THE SERVER.

<code>fab check_for_dependencies</code>

## Run the installer
While the installer is running you will be promted for the following information:

* The address for your MySQL database. Examples:
	* localhost
	* mydatabaseserver.com
* Database User
* Database Password
* Name of Database
* Port for database (defaults to 3306)

## After the installer runs
After the installer sucessfully runs, you will find a sample [Apache](http://httpd.apache.org/) config file. The sample config assumes you have *mod_wsgi* installed and enabled.

Providing configs to deploy OpenTourBuilder using other web servers is beyond the current scope of the installer.





