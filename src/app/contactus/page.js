import Loading from './loading';
import { Suspense } from 'react';
import Error from './error';
import { getServerSession } from 'next-auth/next';
import { options } from '../api/auth/[...nextauth]/options';

async function getPostDetails() {
  try {
    let res = await fetch('https://jsonplaceholder.typicode.com/posts');
    res = await res.json();
    return res;
  } catch (error) {
    console.log('error1=====', error);
  }
}

export default async function Contact() {
  const posts = await getPostDetails();
  const session = await getServerSession(options);
  return (
    <>
      <div className="wrap">
        <h1>Contact Us</h1>

        <h4 style={{ marginBottom: '30px' }}>
          getServerSession Result:{' '}
          {session?.user?.name ? <>{session?.user?.name}</> : <>Not logged in</>}
        </h4>

        <Suspense fallback={<Loading />}>
          <ol>
            {posts.map((data) => (
              <li key={data.id}>{data.title}</li>
            ))}
          </ol>
        </Suspense>
        {/* <button onClick={() => getPostDetails()}>Load Contact</button> */}
      </div>
    </>
  );
}
