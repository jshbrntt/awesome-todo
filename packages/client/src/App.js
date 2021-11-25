import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Lists from './Lists';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <header>
                <h3>Awesome TODO</h3>
            </header>
            <article>
                <Lists />
            </article>
            <footer>
                <hr />
                <p>Awesome TODO © 2021</p>
            </footer>
        </ApolloProvider>
    );
}

export default App;
