ARG BASE_IMAGE="node:16.13.2-alpine3.15"

FROM ${BASE_IMAGE} AS base

FROM base AS client-node-modules

USER node

ARG WORKDIR="/home/node"

WORKDIR ${WORKDIR}/packages/client

COPY packages/client/package.json packages/client/yarn.lock packages/client/.yarnrc ./

RUN yarn install --frozen-lockfile \
&& yarn cache clean --all

ENV PATH="${PATH}:${WORKDIR}/packages/node_modules/.bin"

FROM base AS server-node-modules

USER node

ARG WORKDIR="/home/node"

WORKDIR ${WORKDIR}/packages/server

COPY packages/server/package.json packages/server/yarn.lock packages/server/.yarnrc ./

RUN yarn install --frozen-lockfile \
&& yarn cache clean --all

ENV PATH="${PATH}:${WORKDIR}/packages/node_modules/.bin"

FROM base AS server-artifact

USER node

ARG WORKDIR="/home/node"

WORKDIR ${WORKDIR}/packages/server

COPY packages/server .

RUN rm .yarnrc \
&& yarn install --frozen-lockfile --production \
&& yarn cache clean --all

ENV FASTIFY_ADDRESS="5000"
ENV FASTIFY_ADDRESS="0.0.0.0"

CMD ["node_modules/.bin/fastify", "start", "src/app.mjs"]

FROM client-node-modules AS client-build

COPY packages/client .

RUN yarn build

FROM nginx:1.21.5-alpine AS client-artifact

ARG WORKDIR="/home/node"

COPY --from=client-build ${WORKDIR}/packages/client/build /usr/share/nginx/html

COPY packages/client/templates/default.conf.template /etc/nginx/templates/default.conf.template

ENV NGINX_PORT="5000"

FROM base AS infra-node-modules

USER node

ARG WORKDIR="/home/node"

WORKDIR ${WORKDIR}/packages/infra

COPY packages/infra/package.json packages/infra/yarn.lock packages/infra/.yarnrc ./

RUN yarn install --frozen-lockfile \
&& yarn cache clean --all

FROM base AS infra

ARG CURL_VERSION

RUN apk update \
&& apk add --no-cache \
curl=${CURL_VERSION}-r0

ARG PULUMI_VERSION

RUN curl --remote-name --silent \
https://get.pulumi.com/releases/sdk/pulumi-v${PULUMI_VERSION}-linux-x64.tar.gz \
&& tar --strip-components 1 -C /usr/bin -zxf pulumi-v${PULUMI_VERSION}-linux-x64.tar.gz \
&& rm pulumi-v${PULUMI_VERSION}-linux-x64.tar.gz \
&& chown root:root /usr/bin/pulumi*

ARG WORKDIR="/home/node"

USER node

COPY --chown=node:node --from=infra-node-modules ${WORKDIR}/packages/node_modules ${WORKDIR}/packages/node_modules

ENV PATH="${PATH}:${WORKDIR}/packages/node_modules/.bin"
