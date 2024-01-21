import React from 'react';
import { Button, LinkCustom } from './../utils/utils';
import { getServerSession } from 'next-auth/next';
import { options } from '../api/auth/[...nextauth]/options';

export default async function Dashboard() {
  const session = await getServerSession(options);
  return (
    <div>
      <h1>Dashboard</h1>
      <h4> {session ? 'Session got' : 'NO Session'}</h4>
      <Button navigateTo="/" buttonType="button" className="btn-general">
        Back to Home
      </Button>
    </div>
  );
}
