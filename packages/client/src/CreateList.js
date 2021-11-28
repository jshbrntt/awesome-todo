import { useMutation } from '@apollo/client';
import { CREATE_LIST, GET_LISTS } from './queries';

function CreateList() {
    let input;
    const [createList, { loading, error }] = useMutation(CREATE_LIST, {
        refetchQueries: [
            {
                query: GET_LISTS,
            },
        ],
    });
    if (loading) {
        return <progress />;
    }
    if (error) {
        return <p>❗ Error creating new list</p>;
    }
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                createList({
                    variables: {
                        title: input.value,
                    },
                });
                input.value = '';
            }}
        >
            <div className="grid">
                <input
                    ref={(node) => (input = node)}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                />
                <button type="submit">New List</button>
            </div>
        </form>
    );
}

export default CreateList;
