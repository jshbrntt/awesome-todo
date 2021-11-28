import mongoose from 'mongoose';

const todoItemSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
        default: false,
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'List',
    },
});

const TodoItem = mongoose.model('Item', todoItemSchema);
export default TodoItem;
