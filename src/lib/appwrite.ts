/**
 * Node Modules
 */

import { Client, Databases, ID, Query } from 'appwrite';

const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject(APPWRITE_PROJECT_ID);

const database = new Databases(client);

export { database, ID, Query };
