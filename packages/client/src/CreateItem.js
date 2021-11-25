import { useMutation } from '@apollo/client';
import { CREATE_ITEM, GET_LIST } from './queries';

function CreateItem({ list }) {
    let input;
    const [createItem, { loading, error }] = useMutation(CREATE_ITEM, {
        refetchQueries: [
            {
                query: GET_LIST,
                variables: {
                    id: list,
                },
            },
        ],
    });
    if (loading) {
        return <progress />;
    }
    if (error) {
        return <p>❗ Error creating new item</p>;
    }
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                createItem({
                    variables: {
                        list,
                        description: input.value,
                    },
                });
                input.value = '';
            }}
        >
            <input
                ref={(node) => (input = node)}
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                required
            />
            <button type="submit">Add Item</button>
        </form>
    );
}

export default CreateItem;
