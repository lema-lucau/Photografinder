import { MongoClient } from 'mongodb';
import { DB_CONN_STRING } from '../constants/mongoDBConn';

export async function connectToDb() {
    const client = new MongoClient(DB_CONN_STRING);

    try {
        await client.connect();
        console.log("Nothing went wrong!");
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}