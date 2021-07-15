# REDSPHER TEST

### Without docker

To use without docker, you need to have **PHP8** installed on your system

In case you have multiple php versions on your system, you can create a ``.php-version`` file on the root of the project
and put the desired php version to use to tell ``symfony cli`` which version to use, for example :
```8.0.5```

### With docker 🐳

To use docker, make sure the following environment variables exists
If not changed during the development of the project, they are already defined in ``.env`` file
and you can change those ports , related of witch port you want
```
# DOCKER PORTS
SERVER_PORT=888
REACT_PORT=3000
```

#to install the docker environment
```bash
docker-compose build
docker-compose up -d
```
#to make all sh be executable
```bash
docker-compose exec -T worker chmod -R +x sh/*
```
#to install all the dependencies of project
```bash
docker-compose exec -T worker sh/prepare.sh
```

#to do test
```bash
docker-compose exec -T worker sh/test.sh
```

then the application will be available in http://localhost:888. the port is related to the SERVER_PORT
