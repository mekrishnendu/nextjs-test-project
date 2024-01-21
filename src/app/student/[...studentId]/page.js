'use client';
import { useRouter } from 'next/navigation';
import styles from './../student.module.scss';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';

export default function StudentDetails({ params }) {
  const [post, setPost] = useState([]);

  const fetchDetails = async (id) => {
    const studentDataAPI = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await studentDataAPI.json();
    console.log('hello data', data);
    setPost(data);
  };

  const router = useRouter();
  const pathName = usePathname();
  console.log('param', params);

  useEffect(() => {
    fetchDetails(params.studentId);
  }, [params.studentId]);

  return (
    <div className={styles.studentWrap}>
      <h1>Student Details</h1>
      <p>
        Student id: {params.studentId} <br /> url Path: {pathName}
      </p>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={() => router.push('/student')}>Back</button>
    </div>
  );
}
