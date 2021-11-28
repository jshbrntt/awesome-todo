export default async (fastify, opts) => {
    fastify.get('/', async function (request, reply) {
        return { root: true };
    });
};
