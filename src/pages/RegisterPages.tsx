/**
 * Node Modules
 */
import { SignUp } from '@clerk/clerk-react';
/**
 * Components
 */
import Head from '@/components/Head';

const RegisterPages = () => {
  return (
    <>
      <Head title='Create an Account - Tasky AI to-do List & Project Management App' />
      <section>
        <div className='container flex justify-center'>
          <SignUp signInUrl='/login' />
        </div>
      </section>
    </>
  );
};

export default RegisterPages;
