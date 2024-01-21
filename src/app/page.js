import styles from './page.module.css';
import NavMenu from './components/NavMenu';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
export default async function Home() {
  const session = await getServerSession(options);
  return (
    <main>
      <div>
        <h1>Hello Students getServerSession Result</h1>

        <p>Status: {session?.user?.name ? <>{session?.user?.name}</> : <>Not logged in</>}</p>
      </div>
    </main>
  );
}
