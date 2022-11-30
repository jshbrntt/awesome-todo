BUILDKIT_INLINE_CACHE = 1
DOCKER_BUILDKIT = 1

DOCKER_REGISTRY = registry.gitlab.com
IMAGE_PREFIX = registry.gitlab.com/awesome-todo/awesome-todo
CURL_VERSION = 7.80.0
NODE_VERSION = 16.13.2
PULUMI_VERSION = 3.24.1
MONGO_VERSION = 5.0.4
TARGET = shell
WORKDIR = /home/node
BASE_IMAGE = node:$(NODE_VERSION)-alpine3.15
SERVICES = database server client

NGINX_PORT = 5000
CLIENT_PORT = 3001
MONGO_PORT = 27017
SERVER_DEBUG_PORT = 9229
SERVER_PORT = 3000
MONGO_URI = mongodb://database:27017/todo

export

.ONESHELL:
.PHONY:

login:
	echo $(DOCKER_PASSWORD) | docker login $(DOCKER_REGISTRY) --username $(DOCKER_USERNAME) --password-stdin

push:
	docker compose push \
server

pull:
	docker compose pull \
--ignore-pull-failures \
$(SERVICES)

build:
	docker compose build \
$(SERVICE)

up:
	docker compose up \
--build \
--detach \
$(SERVICES)

down:
	docker compose down

command: build
	docker compose run \
--rm \
--service-ports \
--use-aliases \
$(SERVICE) \
$(COMMAND)

shell: SERVICE = shell
shell: COMMAND = sh
shell: command

infra: SERVICE = infra
infra: COMMAND = sh
infra: command

clean:
	docker compose down \
--rmi all \
--volumes
