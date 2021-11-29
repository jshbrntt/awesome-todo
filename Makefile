export DOCKER_BUILDKIT = 1
export BUILDKIT_INLINE_CACHE = 1
export WORKDIR = /srv/todo
export CLIENT_PORT = 3001
export SERVER_PORT = 3000
export SERVER_DEBUG_PORT = 9229
export MONGO_PORT = 27017
export DOCKER_REGISTRY =
export IMAGE = jshbrntt/awesome-todo:latest
export NODE_VERSION = 16.13.0-alpine
export BUILD_TARGET = dev

.PHONY: up down login pull push lint clean

up: pull
	docker compose up --detach $(SERVICE)

down:
	docker compose down

login:
	echo $(DOCKER_PASSWORD) | docker login $(DOCKER_REGISTRY) --username $(DOCKER_USERNAME) --password-stdin

pull:
	docker compose pull server

push:
	docker compose push server

lint: pull
	docker compose run --rm server yarn lint

clean:
	docker compose down --rmi all --volumes
