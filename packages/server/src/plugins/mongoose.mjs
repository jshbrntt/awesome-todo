import fp from 'fastify-plugin';
import mongoose from 'mongoose';

import TodoItem from '../models/todo-item.mjs';
import TodoList from '../models/todo-list.mjs';

const models = {
    TodoItem,
    TodoList,
};

const connectMongoose = async (fastify, { mongodb }) => {
    try {
        mongoose.connection.on('connected', () => {
            fastify.log.info({ actor: 'MongoDB' }, 'Mongoose connected');
        });
        mongoose.connection.on('disconnected', () => {
            fastify.log.info({ actor: 'MongoDB' }, 'Mongoose disconnected');
        });
        const db = await mongoose.connect(mongodb.uri, mongodb.options);
        fastify.decorate('db', { models });
    } catch (error) {
        console.error(error);
    }
};

export default fp(connectMongoose);
