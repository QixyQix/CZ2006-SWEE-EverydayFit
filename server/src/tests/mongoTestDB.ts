import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = MongoMemoryServer.create();

// Connect to DB
const connect = async () => {
    const uri = (await mongod).getUri();
    // const mongooseOpts = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     poolSize:10
    // };
    await mongoose.connect(uri)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Could not connect to MongoDB: ', err));

}

// Disconnect and close connection
const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await (await mongod).stop();
}

// Clear the DB remove all data
const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        if (key) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
}

const testDB = {
    connect,
    closeDatabase,
    clearDatabase
}

export { testDB as default };