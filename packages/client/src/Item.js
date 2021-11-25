import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { GET_ITEM, UPDATE_ITEM, DELETE_ITEM, GET_LIST } from './queries';

const StyledItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    button {
        width: auto;
        margin: 0;
    }
`;

function Item({ id, list }) {
    const {
        loading: getLoading,
        error: getError,
        data,
    } = useQuery(GET_ITEM, {
        variables: {
            id,
        },
    });
    const [deleteItem, { loading: deleteLoading, error: deleteError }] =
        useMutation(DELETE_ITEM, {
            refetchQueries: [
                {
                    query: GET_LIST,
                    variables: {
                        id: list,
                    },
                },
            ],
        });
    const [updateItem, { loading: updateLoading, error: updateError }] =
        useMutation(UPDATE_ITEM, {
            refetchQueries: [
                {
                    query: GET_ITEM,
                    variables: {
                        id,
                    },
                },
            ],
        });
    if (getError) {
        return <p>❗ Error loading item</p>;
    }
    if (deleteError) {
        return <p>❗ Error deleting item</p>;
    }
    if (updateError) {
        return <p>❗ Error updating item</p>;
    }
    const loading = getLoading || deleteLoading || updateLoading;
    return (
        <StyledItem>
            <label htmlFor={id}>
                <input
                    type="checkbox"
                    id={id}
                    name={id}
                    checked={data && data.todoItem.done}
                    onChange={(event) => {
                        updateItem({
                            variables: {
                                id,
                                done: event.target.checked,
                            },
                        });
                    }}
                />
                {data && data.todoItem.description}
            </label>
            <button
                disabled={loading}
                onClick={() => {
                    deleteItem({
                        variables: {
                            id,
                        },
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
