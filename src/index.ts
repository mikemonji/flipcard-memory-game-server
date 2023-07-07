import 'reflect-metadata';
import express from  'express';
import { ApolloServer } from 'apollo-server-express';

import createSchema from './schema';

const PORT = 8082;

const main = async () => {

    const app = express();
    const schema = await createSchema();

    const apolloServer = new ApolloServer({
        schema,
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ 
        app,
        cors: {
            origin: [ 
                'http://localhost:8083' ,
                'https://studio.apollographql.com',
            ]
        }
    });

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
};

main();