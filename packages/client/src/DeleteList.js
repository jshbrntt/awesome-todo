import { useMutation } from '@apollo/client';
import { DELETE_LIST, GET_LISTS } from './queries';

function DeleteList({ list }) {
    const [
        deleteList, {
            loading,
            error
        }
    ] = useMutation(
        DELETE_LIST, {
            refetchQueries: [
                {
                    query: GET_LISTS
                }
            ]
        }
    );
    if (loading) {
        return (
            <progress />
        );
    }
    if (error) {
        return (
            <p>
                ❗ Error deleting list
            </p>
        )
    }
    return (
        <button
            disabled={loading}
            aria-busy={loading}
            onClick={() => {
                deleteList({
                    variables: {
                        id: list
                    }
                });
            }}
            className="outline contrast"
        >
            Delete List
        </button>
    );
}

export default DeleteList;