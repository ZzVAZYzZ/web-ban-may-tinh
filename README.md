# KEY BOARD SHOP

## DESCRIPTION
This is an ecommerce website demo. This project is based on 3 layers: GUI(client) - BLL(server) - DAL(database), focus on AES encryption while data be transported

## SETUP

### IN FOLDER SERVER

1. create a .env file in folder server same package.json file level

2. input 2 eviroment variable: (AES_KEY should have 16 charters and you should create your mongodb server then add that string to MONGODB_STRING)
    AES_KEY=
    MONGODB_STRING=


3. open terminal: input scripts below one after another
    cd ./server
    npm i

4. script for running server: (dev for development eviroment and start for production enviroment)
    npm run dev
    or
    npm run start

### IN FOLDER CLIENT

1. create a .env file in folder server same package.json file level

2. input 7 eviroment variable: (AES_KEY should have 16 charters and must be same your AES_KEY in your server and you should create your firebase cloud firestore then add that config data to 6 remain variable)
    AES_KEY=
    REACT_APP_FIREBASE_API_KEY=
    REACT_APP_FIREBASE_AUTH_DOMAIN=
    REACT_APP_FIREBASE_PROJECT_ID=
    REACT_APP_FIREBASE_STORAGE_BUCKET=
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
    REACT_APP_FIREBASE_APP_ID=
    REACT_APP_AES_KEY=

3. open terminal: input scripts below one after another
    cd ./client
    npm i

4. script for running server:
    npm run start

## TECHNOLOGIES USED

Cloud Database: Firebase
client: React, Redux ToolKit, Axios, Lodash
server: Express, Bcrypt,  Mongoose, Swagger, JWT, Luxon
Database: Redis, MongoDb

##