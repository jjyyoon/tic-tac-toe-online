# Tic-tac-toe Online

You can check how it looks like here: [Tic-tac-toe Online] 
You can also execute this application by following the instruction below.


## Instructions
1. Download [Python]
2. Download [npm]
3. Download [PostgreSQL]
4. Cloning the repository: [GitHub Help]

**Frontend:** 
1. From root folder
    ```sh
    $ cd frontend
    ```
2. Install packages with npm
    ```sh
    $ npm install
    ```
3. Create a production build of the app.
    ```sh
    $ npm run build
    ```

**Backend:** 
1. From root folder
    ```sh
    $ cd backend
    ```    
2. Install packages with pip
    ```sh
    $ pip install -r requirements.txt
    ```
3. Create a folder 'instance' in the 'backend' folder and create a file 'config.py' that contains configuration below.
    ```python
    DEBUG = True
    JWT_SECRET_KEY = 'super-secret'  # Change this!
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_SECURE = False
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_ACCESS_COOKIE_NAME = 'authentication_token'
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://username:password@localhost:port/mydatabase'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ```
    _About SQLALCHEMY_DATABASE_URI_
    - Change username, password, port and mydatabase to yours. Note that you need to create your database and the user needs to have permissions to create tables.
     E.g. To check your username and port using pgAdmin: right click 'PostgreSQL' on the left side > click 'Properties' > click 'Connection' tap.
    - For more information, visit here: [SQLAlchemy Documentation]
4. Create tables
    ```sh
    $ python create_tables.py
    ```
5. Run the app!
    ```sh
    $ python main.py
    ```


   
   [Tic-tac-toe Online]: <https://jjyyoon.github.io/>
   [Python]: <https://www.python.org/>
   [npm]: <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>
   [PostgreSQL]: <https://www.postgresql.org/>
   [GitHub Help]: <https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository>
   [SQLAlchemy Documentation]: <https://docs.sqlalchemy.org/en/13/core/engines.html#database-urls>
