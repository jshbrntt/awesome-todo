import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import CreateItem from './CreateItem';
import DeleteList from './DeleteList'

import Item from './Item';
import { GET_LIST } from './queries';

const StyledDetails = styled.details`
    border: 2px rgb(55, 73, 86) solid;
    border-radius: .5em;
    padding: 20px;
`;

const StyledSummary = styled.summary`
    padding: 1em 0;
`;

const StyledList = styled.div`
`;

function List({ id: list }) {
    const {
        loading,
        error,
        data
    } = useQuery(
        GET_LIST, {
            variables: {
                id: list
            }
        }
    );
    if (error) {
        return (
            <p>
                ❗ Error loading list
            </p>
        )
    }
    return (
        <StyledDetails open>
            <StyledSummary>
                {data && data.todoList.title}
            </StyledSummary>
            <div className="grid">
                <div>
                    <CreateItem list={list}/>
                    <DeleteList list={list}/>
                </div>
                <div>
                    {
                        data && data.todoList.items.length
                            ? data.todoList.items.map(
                                ({ id }) => <Item key={id} id={id} list={list} />
                            )
                            : (
                                loading
                                    ? <progress />
                                    : <p>
                                        Empty
                                    </p>
                            )
                    }
                </div>
            </div>
        </StyledDetails>
    );
}

export default List;
