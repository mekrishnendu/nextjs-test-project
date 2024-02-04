import { connectionStr } from '../../lib/db';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { RegisteredUser } from '../../lib/model/registereduser';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const { email, password } = await request.json();
  await mongoose.connect(connectionStr);
  const existingUser = await RegisteredUser.findOne({ email });
  if (existingUser) {
    return new NextResponse('Email is already in use', { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new RegisteredUser({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse('user is registered', { status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500,
      message: 'some thing went wrong in login',
    });
  }
}
