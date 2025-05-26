/**
 * Custom MODULEs
 */

import { database } from '@/lib/appwrite';
import { generateUniqueId, getUserId } from '@/lib/utils';
/**
 * Types
 */
import type { ActionFunction } from 'react-router';
import type { Task } from '@/types';
/**
 * Environment Variabels
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const createTask = async (data: Task) => {
  try {
    return await database.createDocument(
      APPWRITE_DATABASE_ID,
      'tasks',
      generateUniqueId(),
      { ...data, userId: getUserId() },
    );
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (data: Task) => {
  const documentId = data.id;

  if (!documentId) throw new Error('Task Id not found');

  delete data.id;
  try {
    return await database.updateDocument(
      APPWRITE_DATABASE_ID,
      'tasks',
      documentId,
      data,
    );
  } catch (err) {
    console.log(err);
  }
};

const appActions: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task;

  if (request.method === 'POST') {
    return await createTask(data);
  }
  if (request.method === 'PUT') {
    return await updateTask(data);
  }
};

export default appActions;
