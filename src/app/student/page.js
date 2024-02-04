'use client';
import styles from './student.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, LinkCustom } from './../utils/utils';
import { signIn, signOut, useSession } from 'next-auth/react';

// const post = [
//   {
//     name: 'Ravi',
//     id: 1,
//   },
//   {
//     name: 'Anuj',
//     id: 2,
//   },
//   {
//     name: 'Dilip',
//     id: 3,
//   },
// ];

export default function Student() {
  const [post, setPost] = useState([]);

  const fetchPost = async () => {
    const studentDataAPI = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await studentDataAPI.json();
    console.log('hello data', data);
    setPost(data);
    // return data;
  };

  // async function fetchStudent() {
  //   console.log('hello');
  //   const studentDataAPI = await fetch('https://jsonplaceholder.typicode.com/users');
  //   const data = await studentDataAPI.json();
  //   console.log('hello data', data);
  //   return data;
  // }

  useEffect(() => {
    fetchPost();
  }, []);

  const { data: session, status } = useSession();
  console.log('session', session);

  if (status === 'loading') {
    return 'Loading or not authenticated...';
  }

  return (
    <div className={styles.studentWrap}>
      <h1>Students corner</h1>
      {session ? (
        <button onClick={() => signOut('github')}>Sign Out(GitHub)</button>
      ) : (
        <button onClick={() => signIn('github')}>Sign In with GitHub</button>
      )}
      <br /> <br />
      {session ? (
        <>
          <p>
            <strong> Status: {status}</strong>
          </p>
          <ol>
            {post.map((data) => (
              <li key={data.id}>
                <LinkCustom navigateTo={`/student/${data.id}`}>{data.title}</LinkCustom>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <h4>
          Please login to see the page,<strong> Status: {status}</strong>
        </h4>
      )}
      <br />
      <Button navigateTo="/" buttonType="button" className="btn-general">
        Back to Home
      </Button>
    </div>
  );
}
