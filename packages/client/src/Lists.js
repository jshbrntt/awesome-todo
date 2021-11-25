import { useQuery } from '@apollo/client';
import CreateList from './CreateList';

import List from './List';
import { GET_LISTS } from './queries';

function Lists() {
    const {
        loading,
        error,
        data
    } = useQuery(GET_LISTS);
    if (loading) {
        return (
            <progress />
        );
    }
    if (error) {
        return (
            <p>
                ❗ Error loading lists
            </p>
        )
    }
    return (
        <section>
            <h4>
                Lists
            </h4>
            {loading &&
                <progress />
            }
            {data && data.todoLists.map(
                ({ id }) => <List key={id} id={id} />
            )}
            <CreateList />
        </section>
    );
}

export default Lists;
