export DOCKER_BUILDKIT = 1
export BUILDKIT_INLINE_CACHE = 1
export WORKDIR = /srv/todo
export CLIENT_PORT = 3001
export SERVER_PORT = 3000
export MONGO_PORT = 27017
export DOCKER_REGISTRY = docker.pkg.github.com/joshua-barnett
export IMAGE_TAG = $(DOCKER_REGISTRY)/awesome-todo/dev
export NODE_VERSION = 16.13.0-alpine

up:
	docker compose up --detach $(SERVICE)

down:
	docker compose down

login:
	echo $(DOCKER_PASSWORD) | docker login $(DOCKER_REGISTRY) --username $(DOCKER_USERNAME) --password-stdin

push:
	docker compose push client server

lint:
	docker compose run --rm server yarn lint

clean:
	docker compose down --rmi all --volumes
