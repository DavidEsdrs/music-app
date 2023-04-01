# Music app
API for music streaming. The API has a range of features for authentication, authorization, music streaming, playlists management, and more. Here are some key features of the API:

- [X] User authentication and authorization:
    * The API allows to authenticate using an access token generated through valid credentials. Additionally, the API also provides a token refresh feature to allow for renewal of the access token before expiration;
- [X] Music Streaming:
    * The API supports real-time music streaming to provide a seamless listening experience to users;
- [X] Playlists management;
    * Users can create and manage personal playlists, add or remove songs from playlists, and interect with other public playlists from other users by viewing it and adding it to its own playlist list;
- [X] Search songs and playlists by tags:
    * The API provides a intuitive searching system to find related songs and playlists;
- [X] Clear and concise [documentation](#api-docs) of all the endpoints with request and response examples:
    * The tecnical documentation fully cover all the API features and provides a starting point to interact with the API quickly;
    
- Technologies:
    - Typescript;
    - Express;
    - Typeorm;
    - MySql;
    - FFmpeg;
    - Joi;
    - JsonWebToken;
    - Multer;

## API Docs
After setting everything up, you can find the API documentation by accessing [https://localhost:3000/api/docs](https://localhost:3000/api/docs).

## Getting started
- This project uses the `ffmpeg` package for get some information from the uploaded files, to run the project properly, install the package in your machine with your favorite package manager:
- Intallation with `chocolatey`:
```console
choco install ffmpeg
```
The project was developed with the version `5.1.2` of ffmpeg, but should run properly in `6.0`

With `ffmpeg` alredy installed, follow the below instructions to getting started with the project:
1. Create a folder to store the project;
2. Clone the github repository inside the folder:
```
git clone https://github.com/DavidEsdrs/music-app.git .
```
3. Install the modules with your favorite node package manager:
- Using `npm`:
```
npm install
```
- Using `yarn`:
```
yarn
```

The project Uses `MySql` as database, make sure to [install](https://dev.mysql.com/downloads/installer/) it before proceed;
The project was developed with the mysql version `8.0.32` and uses [features only avaiable](https://dev.mysql.com/blog-archive/mysql-8-0-16-introducing-check-constraint/) in version `>=8.0.16`, to run the project properly, please install a mysql version higher than that;

4. Run the mysql cli or application and create a database to run the project;

5. Create a `.env.dev` file inside the root of the project:
```env
DATABASE_URL="<YOUR DATABASE URL>"
ACCESS_TOKEN_SECRET="<YOUR RANDOM ACCESS TOKEN SECRET>"
REFRESH_TOKEN_SECRET="<YOUR RANDOM REFRESH TOKEN SECRET>"
ACCESS_TOKEN_LIFESPAN="<ACCESS TOKEN LIFESPAN, RECOMMENDED 1200s (20min)>"
REFRESH_TOKEN_LIFESPAN="<ACCESS TOKEN LIFESPAN, RECOMMENDED 10d (10 days)>"
SERVER_PORT=<SERVER PORT TO RUN THE PROJECT>
API_URL=<API URL>
FRONT_END_URL=<FRONT END URL>
SSL_CERT_KEY=<NAME OF THE SSL CERTIFICATE KEY INSIDE DE SSL FOLDER>
SSL_CERT=<NAME OF THE ACTUAL SSL CERTIFICATE ALSO INSIDE SSL FOLDER>
```