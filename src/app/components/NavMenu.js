import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { options } from '../api/auth/[...nextauth]/options';
const NavMenuBar = async () => {
  const session = await getServerSession(options);
  console.log('session nav===', session);
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
            <Link href="/api/auth/signout">Sign out</Link>
          </li>
        ) : (
          <li>
            <Link href="/api/auth/signin">Sign in</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavMenuBar;
