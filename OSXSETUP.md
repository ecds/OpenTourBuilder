# How to Install on OS X
## Things to Install
1. [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
2. Xcode command line tools  
```bash
xcode-select --install
```
3. Homebrew: OS X package manager 
```bash  
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"  
```
4. SQLite3[^mysql] for the database 
```bash
brew install sqlite3
```
5. Pip for install Python packages
```bash
sudo easy_install pip
```
6. Virtualenv: Python app to manage dependancies  
```bash  
pip install virtualenv  
``` 

[^mysql]: You can use MySQL. `brew install mysql` and setup a database and user.

## Set up OTB Server
1. Make a directory where you want the code to live  
```bash  
mkdir ~/some/folder  
cd ~/some/folder  
```  
2. Clone the code
```bash
git clone https://github.com/emory-libraries-ecds/OpenTourBuilder
```  
3. Setup virtualenv and install dependancies  
```bash  
virtualenv venv  
source venv/bin/actavite  
pip install -r requirements.txt  
```  
4. Configure Django App
Open a new file `~/some/folder/tours/settings/local.py` in TextEdit, or your favorite text editor  
```bash  
Open /Applications/TextEdit.app ~/some/folder/tours/settings/local.py  
```  
  Paste the following and save:  
  
```python  
from sys import argv
from os.path import join, abspath, dirname

BASE_DIR = abspath(dirname(__file__) + "/../")

if 'test' in argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'otb-test'
        }
    }

    MEDIA_ROOT = join(BASE_DIR, 'apps/tour/fixtures/media')

else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'mydatabase',
        }
    }

CORS_ORIGIN_ALLOW_ALL = True
  
```  

5. Setup Django App. Follow the prompts on the last one.   
 
```bash  
python manage.py syncdb  
python manage.py loaddata initial_data  
mkdir tours/sitemedia  
python manage.py collectstatic --noinput  
python manage.py setSite localhost
python manage.py createsuperuser
```  

## Run the Server App  
At this point you should be able to start the Django App
```bash
python manage.py rumserver 0.0.0.0:8000
```

Now you should be able to go to [http://localhost:8000/admin](http://localhost:8000/admin) and log in with the user you created in the previous section.

## Setup the Front End Client
Open up a new terminal session and go to the folder where you cloned the server app

```bash  
cd ~/some/folder  
```


