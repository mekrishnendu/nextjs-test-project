'use client';
import Link from 'next/link';
// import { getServerSession } from 'next-auth/next';
// import { options } from '../api/auth/[...nextauth]/options';
import { signOut, useSession } from 'next-auth/react';

const NavMenuBar = () => {
  // const session = await getServerSession(options);
  const { data: session } = useSession();
  return (
    <>
      <ul>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/student">Student</Link>
        </li>
        <li>
          <Link href="/contactus">Contact</Link>
        </li>

        {session ? (
          <li>
            {/* <Link href="/api/auth/signout">Sign out</Link> */}
            <button onClick={() => signOut()}>signout</button>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
            {/* <li>
              <Link href="/api/auth/signin">login with Github</Link>
            </li> */}
          </>
        )}
      </ul>
      {session && <h4>Welcome {session.user?.email} </h4>}
    </>
  );
};

export default NavMenuBar;
