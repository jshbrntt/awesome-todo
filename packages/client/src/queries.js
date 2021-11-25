
import { gql } from "@apollo/client";

const CREATE_ITEM = gql`
    mutation CREATE_ITEM($list: ID!, $description: String!) {
        createTodoItem(data: {
            list: $list
            description: $description
        }) {
            id
            description
            done
        }
    }
`;

const CREATE_LIST = gql`
    mutation CREATE_LIST($title: String!) {
        createTodoList(data: {
            title: $title
        }) {
            id
            title
            items {
                id
            }
        }
    }
`;

const GET_ITEM = gql`
    query GET_ITEM($id: ID!) {
        todoItem(id: $id) {
            id
            description
            done
            list
        }
    }
`;

const GET_LISTS = gql`
    query GET_LISTS {
        todoLists {
            id
        }
    }
`;

const GET_LIST = gql`
    query GET_LIST($id: ID!) {
        todoList(id: $id) {
            id
            title
            items {
                id
            }
        }
    }
`;

const UPDATE_ITEM = gql`
    mutation UPDATE_ITEM($id: ID!, $done: Boolean, $description: String) {
        updateTodoItem(data: {
            id: $id
            done: $done
            description: $description
        }) {
            id
            description
            done
        }
    }
`;

const DELETE_ITEM = gql`
    mutation DELETE_ITEM($id: ID!) {
        deleteTodoItem(data: {
            id: $id
        }) {
            id
            description
            done
            list
        }
    }
`;

const DELETE_LIST = gql`
    mutation DELETE_LIST($id: ID!) {
        deleteTodoList(data: {
            id: $id
        }) {
            id
        }
    }
`;

export {
    CREATE_ITEM,
    CREATE_LIST,
    GET_ITEM,
    GET_LISTS,
    GET_LIST,
    UPDATE_ITEM,
    DELETE_ITEM,
    DELETE_LIST
};
