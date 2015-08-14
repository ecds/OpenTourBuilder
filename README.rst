# Pre Install

## Install Some System Packages

### Ubuntu

    sudo apt-get install fabric

### Red Hat

   yum install fabric


## Run fab.check_for_dependencies to check whether you have all dependencies installed or not. If the dependencies are not installed it should pormpt you install them automatically. YOU HAVE TO HAVE SUDO ACCESS TO THE SERVER.

## Get your database and user
Setting up a MySQL database for your OpenTourBuilder install is beyond the scope of this how-to. You will need the address of the MySQL database server, eg. db.example.com or localhost.

db_host = #database host. Default is localhost
db_user =  #database username
db_password  = # user's password
db_database = # database name
db_port = # database port, the default is 3306


