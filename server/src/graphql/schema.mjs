const schema = `
type TodoItem {
    id: ID!
    done: Boolean!
    description: String!
    list: ID!
}
type TodoList {
    id: ID!
    title: String!
    items: [TodoItem!]
}
input CreateTodoListInput {
    id: ID
    title: String!
}
input CreateTodoItemInput {
    id: ID
    done: Boolean
    description: String!
    list: ID!
}
input UpdateTodoListInput {
    id: ID!
    title: String
}
input UpdateTodoItemInput {
    id: ID!
    done: Boolean
    description: String
    list: ID
}
input DeleteTodoListInput {
    id: ID!
}
input DeleteTodoItemInput {
    id: ID!
}
type Query {
    todoList(id: ID!): TodoList!
    todoLists: [TodoList]!
    todoItem(id: ID!): TodoItem!
    todoItems: [TodoItem]!
}
type Mutation {
    createTodoList(data: CreateTodoListInput!): TodoList!
    createTodoItem(data: CreateTodoItemInput!): TodoItem!
    updateTodoList(data: UpdateTodoListInput!): TodoList!
    updateTodoItem(data: UpdateTodoItemInput!): TodoItem!
    deleteTodoList(data: DeleteTodoListInput!): TodoList!
    deleteTodoItem(data: DeleteTodoItemInput!): TodoItem!
}
`;

export default schema;
