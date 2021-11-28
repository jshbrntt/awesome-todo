import TodoList from '../models/todo-list.mjs';
import TodoItem from '../models/todo-item.mjs';

const resolvers = {
    Query: {
        todoLists: async (_, obj) => {
            const todoLists = await TodoList.find({}).populate('items');
            return todoLists;
        },

        todoList: async (_, obj) => {
            const { id } = obj;
            const todoList = await TodoList.findById(id).populate('items');
            return todoList;
        },

        todoItems: async (_, obj) => {
            const todoItems = await TodoItem.find({});
            return todoItems;
        },

        todoItem: async (_, obj) => {
            const { id } = obj;
            const todoItem = await TodoItem.findById(id);
            return todoItem;
        },
    },

    Mutation: {
        createTodoList: async (_, { data }) => {
            const newTodoList = new TodoList(data);
            const todoList = await newTodoList.save();
            return todoList;
        },

        createTodoItem: async (_, { data }) => {
            const { list } = data;
            const todoList = await TodoList.findById(list, {
                _id: 1,
                items: 1,
            });
            console.log(todoList);
            data.list = todoList._id;
            const newTodoItem = new TodoItem(data);
            const todoItem = await newTodoItem.save();
            todoList.items.push(todoItem._id);
            await todoList.save();
            return todoItem;
        },

        updateTodoList: async (_, { data }) => {
            const updatedTodoList = await TodoList.findByIdAndUpdate(
                data.id,
                data
            );
            return updatedTodoList;
        },

        updateTodoItem: async (_, { data }) => {
            const updatedTodoItem = await TodoItem.findByIdAndUpdate(
                data.id,
                data
            );
            return updatedTodoItem;
        },

        deleteTodoList: async (_, { data }) => {
            const todoList = await TodoList.findById(data.id).populate('items');
            await todoList.remove();
            await TodoItem.deleteMany({ _id: { $in: todoList.items } });
            return todoList;
        },

        deleteTodoItem: async (_, { data }) => {
            const deletedTodoItem = await TodoItem.findByIdAndDelete(data.id);
            const todoList = await TodoList.findById(deletedTodoItem.list, {
                items: 1,
            });
            todoList.items.pull(deletedTodoItem._id);
            await todoList.save();
            return deletedTodoItem;
        },
    },
};

export default resolvers;
