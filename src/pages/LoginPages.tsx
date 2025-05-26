/**
 * Node Modules
 */
import { SignIn } from '@clerk/clerk-react';
/**
 * Components
 */
import Head from '@/components/Head';

const LoginPages = () => {
  return (
    <>
      <Head title='Log In to Tasky Todo AI - Manage Your To-Do List and Projects' />
      <section>
        <div className='container flex justify-center'>
          <SignIn signUpUrl='/register' />
        </div>
      </section>
    </>
  );
};

export default LoginPages;
