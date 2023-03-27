# Music app
- API for music streaming;

- Features:
    - [X] User authentication;
    - [X] Create Playlists;
    - [X] Upload songs;
    - [X] Songs Streaming;
    - [X] Add public playlists from another user;
    - [X] Public and private playlists;
    - [X] Search songs and playlists by tags;
    
- Technologies:
    - Typescript;
    - Express;
    - Typeorm;
    - MySql;
    - FFmpeg;
    - Joi;
    - JsonWebToken;
    - Multer;

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
The project was developed with the mysql version `8.0.32` and uses [features only avaiable](https://dev.mysql.com/blog-archive/mysql-8-0-16-introducing-check-constraint/) in version `>8.0.16`, to run the project properly, please install a mysql version higher than that;

4. Run the mysql cli or application and create a database to run the project;

5. Create a `.env.dev` file inside the root of the project:
```env
DATABASE_URL="<YOUR DATABASE URL>"
ACCESS_TOKEN_SECRET="<YOUR RANDOM ACCESS TOKEN SECRET>"
REFRESH_TOKEN_SECRET="<YOUR RANDOM REFRESH TOKEN SECRET>"
ACCESS_TOKEN_LIFESPAN="<ACCESS TOKEN LIFESPAN, RECOMMENDED 1200s (20min)>"
REFRESH_TOKEN_LIFESPAN="<ACCESS TOKEN LIFESPAN, RECOMMENDED 10d (10 days)>"
SERVER_PORT=<SERVER PORT TO RUN THE PROJECT>
API_URL="https://local.host.br:3000/api"
FRONT_END_URL="https://local.host.br:3001"
SSL_CERT_KEY="localhost-key.pem"
SSL_CERT="localhost.pem"
```


# TODO
- Featured playlists:
    * When search featured playlist search by the most used tag present in the playlist;
    * Query:
        - Affinity:
            * How equal are the given song with the songs related to;
    * Tag:
        - Name;
        - Type:
            * Not Null;
            * Enum:
                - Genre;
                - Feature;
                - Artist;