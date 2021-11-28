import config from 'config';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import AutoLoad from 'fastify-autoload';
import mercurius from 'mercurius';

import schema from './graphql/schema.mjs';
import resolvers from './graphql/resolvers.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async (fastify, opts) => {
    const options = Object.assign(config, opts);
    fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        options,
    });
    fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        options,
    });
    fastify.register(mercurius, {
        schema,
        resolvers,
        graphiql: true,
    });
};
