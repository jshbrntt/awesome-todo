import {
    useQuery,
    useMutation,
} from "@apollo/client";
import styled from 'styled-components';
import {
    GET_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    GET_LIST
} from "./queries";


const StyledItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    button {
        width: auto;
        margin: 0;
    }
`

function Item({ id, list }) {
    const {
        loading: getLoading,
        error: getError,
        data: getData
    } = useQuery(
        GET_ITEM, {
            variables: {
                id
            }
        }
    );
    const [
        deleteItem, {
            data: deleteData,
            loading: deleteLoading,
            error: deleteError
        }
    ] = useMutation(
        DELETE_ITEM, {
            refetchQueries: [
                {
                    query: GET_LIST,
                    variables: {
                        id: list
                    }
                }
            ]
        }
    );
    const [
        updateItem, {
            data: updateData,
            loading: updateLoading,
            error: updateError
        }
    ] = useMutation(
        UPDATE_ITEM, {
            refetchQueries: [
                {
                    query: GET_ITEM,
                    variables: {
                        id
                    }
                }
            ]
        }
    );
    if (getError) {
        return (
            <p>
                ❗ Error loading item
            </p>
        );
    }
    if (getLoading) {
        return (
            <progress />
        )
    }
    let { description, done } = getData.todoItem;
    return (
        <StyledItem>
            <label
                htmlFor={id}
                aria-busy={getLoading}
            >
                <input
                    type="checkbox"
                    id={id}
                    name={id}
                    checked={done}
                    onChange={event => {
                        updateItem({
                            variables: {
                                id,
                                done: event.target.checked
                            }
                        });
                    }}
                />
                {description}
            </label>
            <button
                disabled={deleteLoading}
                aria-busy={deleteLoading}
                onClick={() => {
                    deleteItem({
                        variables: {
                            id
                        }
                    });
                }}
                className="outline contrast"
            >
                Delete
            </button>
        </StyledItem>
    );
}

export default Item;
