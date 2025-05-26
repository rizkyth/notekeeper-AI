/**
 * node modules
 */
import { database, Query } from '@/lib/appwrite';

/**
 * Custom modules
 */
import { getUserId } from '@/lib/utils';

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';

/**
 * Environment Variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    return await database.listDocuments(APPWRITE_DATABASE_ID, 'tasks', [
      Query.equal('completed', false),
      Query.isNull('project'),
      Query.equal('userId', getUserId()),
    ]);
  } catch (error) {
    console.log(error);
    throw new Error('Error Getting Inbox Tasks');
  }
};

const inboxTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  console.log(tasks);
  return { tasks };
};

export default inboxTaskLoader;
