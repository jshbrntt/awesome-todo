# Awesome TODO

Quickly written TODO app (to demonstrate dockerization).

## Getting Started

1.  Install [Node.js](https://nodejs.org/en/)

1.  Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

1.  Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

1.  Install dependencies

    ```shell
    $ yarn install --frozen-lockfile
    ```

1. Start MongoDB

    ```shell
    $ mongod --storageEngine ephemeralForTest
    ```
1. Start Server

    ```shell
    $ yarn server
    ```

1. Start Client

    ```shell
    $ yarn client
    ```

1.  Go to app

    http://localhost:3001/

## Libraries

### Frontend
- Boilerplate Generator - [`create-react-app`](https://create-react-app.dev/)
- Styling - [`styled-components`](https://styled-components.com/)
- Base Styles - [`@picocss/pico`](https://picocss.com/)
- GraphQL Client - [`@apollo/client`](https://www.apollographql.com/docs/react/)

### Backend
- Boilerplate Generator - [`create-fastify`](https://github.com/fastify/create-fastify)
- Data Models - [`mongoose`](https://mongoosejs.com/)
- GraphQL Adapter - [`mercurius`](https://mercurius.dev/#/)
- Config Management - [`config`](https://github.com/lorenwest/node-config)
