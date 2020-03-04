# Tic-tac-toe Online
You can check how it looks like here: [Tic-tac-toe Online]  
You can also execute this application by following the instructions below.

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
3. Create a folder 'instance' in the 'backend' folder and create a file 'config.py' that contains configurations below.
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
    - First, you should create your database. To do it, you must be a superuser or have the CREATE privilege. Then change 'mydatabase' to your database name.
    - Change username, password and port to yours. (e.g. Using pgAdmin, you can check your username and port like this: Right click 'PostgreSQL' on the left side > Click 'Properties' > Click 'Connection' tap.)
    - For more information, visit these websites: 
        - [pgAdmin: Database Dialog]
        - [PostgreSQL: Creating a Database]
        - [SQLAlchemy: Database Urls]
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
   [pgAdmin: Database Dialog]: <https://www.pgadmin.org/docs/pgadmin4/latest/database_dialog.html>
   [PostgreSQL: Creating a Database]: <https://www.postgresql.org/docs/current/manage-ag-createdb.html>
   [SQLAlchemy: Database Urls]: <https://docs.sqlalchemy.org/en/13/core/engines.html#database-urls>

