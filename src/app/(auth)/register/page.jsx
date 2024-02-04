'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const signinForm = async (val) => {
    val.preventDefault();

    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password is invalid');
      return;
    }

    let payload = {
      email: val.target[0].value,
      password: val.target[1].value,
    };

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (res.status === 400) {
        setError('This email is already registered');
      }
      if (res.status === 200) {
        setError('');
        router.push('/login');
      }
    } catch (error) {
      setError('Error, try again');
      console.log(error);
    }
    console.log('values', payload);
  };

  if (sessionStatus === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="login-signup-outer">
      <h2>Register</h2>
      <form onSubmit={signinForm}>
        <div>
          {' '}
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          {' '}
          <label>Pssword</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
        <p>{error && error}</p>
      </form>
    </div>
  );
}
