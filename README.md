# message-queuing
A implementation of queueing messages into a database using Redis, BullJS and MongoDB.

## How to build and run via Docker Compose

### Build and run
```
docker-compose up -d --build
```

### Re-run
```
docker-compose up -d
```

## How to put it down via Docker Compose
```
docker-compose down
```

## If you don't have Docker Compose, you can follow the link below
https://docs.docker.com/compose/install/

## How build and run the project without Docker Compose
```
npm run build
```
```
npm start
```

NOTE: You'll need to have a Redis and a MongoDB separately, also you'll need to update the variables and put these in a .env file.