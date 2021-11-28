export WORKDIR = /srv/todo
export CLIENT_PORT = 3001
export SERVER_PORT = 3000
export MONGO_PORT = 27017
export IMAGE_TAG = awesome-todo/dev/alpine
export NODE_VERSION = 16.13.0-alpine

up:
	docker compose up $(SERVICE)

down:
	docker compose down
