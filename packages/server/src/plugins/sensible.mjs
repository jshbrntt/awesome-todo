import fp from 'fastify-plugin';
import sensible from 'fastify-sensible';

export default fp(async (fastify, opts) => {
    fastify.register(sensible, {
        errorHandler: false,
    });
});
