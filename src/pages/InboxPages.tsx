/**
 * Node Modules
 */
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

/**
 * Components
 */
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageTitle, PageList } from '@/components/Page';
import TaskCreateButton from '@/components/TaskCreateButton';
import TaskEmptyState from '@/components/TaskEmptyState';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';

/**
 * Types
 */
import type { Models } from 'appwrite';

const InboxPages = () => {
  const fetcher = useFetcher();

  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();
  const [taskFormShow, setTaskFormShow] = useState(false);
  return (
    <>
      <Head title='Inbox - Tasky Todo AI' />
      <TopAppBar
        tittle='Inbox'
        taskCount={20}
      />
      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>
        <PageList>
          {tasks.documents.map(
            ({ $id, content, completed, due_date, project }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                completed={completed}
                dueDate={due_date}
                project={project}
              />
            ),
          )}

          {!taskFormShow && (
            <TaskCreateButton
              onClick={() => {
                setTaskFormShow(true);
              }}
            />
          )}

          {!taskFormShow && <TaskEmptyState type='inbox' />}

          {taskFormShow && (
            <TaskForm
              className='mt-1'
              mode='create'
              onCancel={() => setTaskFormShow(false)}
              onSubmit={(FormData) => {
                fetcher.submit(JSON.stringify(FormData), {
                  action: '/app',
                  method: 'post',
                  encType: 'application/json',
                });
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  );
};

export default InboxPages;
