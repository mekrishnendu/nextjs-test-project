import React from 'react';
import { Button, LinkCustom } from './../utils/utils';
import { getServerSession } from 'next-auth/next';
import { options } from '../api/auth/[...nextauth]/options';
import Loading from './studentloading';
import { Suspense } from 'react';

async function getStudentsDetails() {
  //API DRVELOPED IN NEXTJS
  try {
    let res = await fetch('http://localhost:3000/api/nextproducts');
    res = await res.json();
    console.log('students=====', res);
    return res;
  } catch (error) {
    console.log('error1=====', error);
  }
}

export default async function Dashboard() {
  const studets = await getStudentsDetails();
  const session = await getServerSession(options);
  return (
    <div>
      <h1>Dashboard</h1>
      <h4> {session ? 'Session got' : 'NO Session'}</h4>
      {console.log('studets1***', studets)}

      <h3>Students List</h3>
      <Suspense fallback={<Loading />}>
        <ol>
          {studets.data.length > 0 &&
            studets.data.map((data) => (
              <li key={data.id}>
                Name: {data.name} {data.surname} <br /> Email:{data.email}
              </li>
            ))}
        </ol>
      </Suspense>
      <Button navigateTo="/" buttonType="button" className="btn-general">
        Back to Home
      </Button>
    </div>
  );
}
