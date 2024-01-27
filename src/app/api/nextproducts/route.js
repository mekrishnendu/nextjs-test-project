import { connectionStr } from '../../lib/db';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { NextProduct } from '../../lib/model/nextproduct';

// GET THE LIST
export async function GET() {
  let data = [];
  let status = '';
  try {
    await mongoose.connect(connectionStr);
    data = await NextProduct.find();
    status = 200;
  } catch {
    data = 'some thing went wrong';
    status = 500;
  }

  return NextResponse.json({ data, status });
}

// APPEND INTO THE LIST
export async function POST(request) {
  let data = [];
  let status = '';
  try {
    let payload = await request.json();
    await mongoose.connect(connectionStr);
    data = await new NextProduct(payload);
    status = 200;
  } catch (error) {
    data = {
      message: 'some thing went wrong',
    };
    status = 500;
  }
  let result = await data.save();
  return NextResponse.json({ result, status });
}
