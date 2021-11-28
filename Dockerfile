# ⚠ Cannot use sha256 if you want to support multi-arch 😔
ARG NODE_VERSION="16.13.0"

FROM node:${NODE_VERSION} AS base

FROM base AS install

ARG PROJECT="awesome-todo"

WORKDIR /srv/${PROJECT}

# If these files change...
COPY package.json yarn.lock .yarnrc ./
COPY packages/server/package.json packages/server/
COPY packages/client/package.json packages/client/
COPY packages/shared/package.json packages/shared/

# ...this will run again when rebuilt
RUN yarn install --frozen-lockfile

FROM base AS dev

ARG PROJECT="awesome-todo"

# Copy just what we want from the previous stage
COPY --from=install /tmp/${PROJECT}/node_modules /tmp/${PROJECT}/node_modules

# Updating PATH variable
ENV PATH="${PATH}:/tmp/${PROJECT}/node_modules/.bin"