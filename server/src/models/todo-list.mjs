import mongoose from 'mongoose';

const todoListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    items: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
            },
        ],
        required: true,
    },
});

const TodoList = mongoose.model('List', todoListSchema);
export default TodoList;
