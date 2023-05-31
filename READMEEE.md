# Setting up environment variable for python project
This guide are about how to setting up environment variable in python project also included setup in development environemnt and production environemnt

## Development environemnt

### Pre-requirement
1. you must have ***pip*** install on you computer
2. install ***dotenv*** by use this command `pip install python-dotenv`

### How to use environment variable
1. create file .env that contain environment variable
2. before load variable from .env you must add thease first
    - `import os`
    - `from dotenv import load_dotenv`
    - `load_dotenv()`
3. get value from environment variable that you created
    - `ENV_VAR = os.getenv('<your-env-var>')`

### Example
down below is a simulate the directory of python project  
- root_project_directory
    - .env    
        `USER_NAME=admin`  
        `PASSWORD=root`  
    - main_program.py  
        `import os`  
        `from dotenv import load_dotenv`  
        `load_dotenv()`  
        `USER_NAME = os.getenv('USER_NAME')`  
        `PASSWORD = os.getenv('PASSWORD')` 

## Production environemnt

### Pre-requirement
1. you must have ***docker*** install on you computer
2. docker container must be ***linux container***

### How to use environment variable
1. create ***Dockerfile*** that contain your environment variable by using `ENV your_key=your_keyvalue` instruction
---


2. before load variable from .env you must add thease first
    - `import os`
    - `from dotenv import load_dotenv`
    - `load_dotenv()`
3. get value from environment variable that you created
    - `ENV_VAR = os.getenv('<your-env-var>')`