'use client';
import { useRouter } from 'next/navigation';
import styles from './../page.module.css';

export default function AboutPage() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <h1>About Page</h1>
      <button onClick={() => router.push('/')}>Home</button>
    </div>
  );
}
