'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const signinForm = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password is invalid');
      return;
    }

    // signIn is the build in method of nextauth
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid email or password');
      if (res?.url) router.replace('/dashboard');
    } else {
      setError('');
    }
  };

  if (sessionStatus === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="login-signup-outer">
      <h2>Login</h2>
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
          <button type="submit">Login</button>
        </div>
        <p>{error && error}</p>
        {/**
         * login: louishreadonly@mailinator.com
         * pass : 8K&byJ&S1F
         */}
      </form>

      <button
        onClick={() => {
          signIn('github');
        }}
      >
        Sign In with Github
      </button>
      <div>- OR -</div>
      <Link href="/register">Register Here</Link>
    </div>
  );
}
