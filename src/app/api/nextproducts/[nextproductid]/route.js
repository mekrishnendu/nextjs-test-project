import { connectionStr } from '../../../lib/db';
import { NextResponse } from 'next/server';
import mooongose from 'mongoose';
import { NextProduct } from '../../../lib/model/nextproduct';

// UPDATE
export async function PUT(request, id) {
  console.log('put request', request, id);
  await mooongose.connect(connectionStr);
  let payload = await request.json();
  let requestId = { _id: id.params.nextproductid }; // MONGO DB HAS ID LIKE _id IN DB , nextproductid is the name of the folder
  let result = await NextProduct.findOneAndUpdate(requestId, payload);
  return NextResponse.json({ data: result, status: 200 });
}

// GET BY ID
export async function GET(request, id) {
  console.log('get request===', id);
  await mooongose.connect(connectionStr);
  let recordId = id.params.nextproductid;
  let requestId = { _id: recordId }; // MONGO DB HAS ID LIKE _id IN DB , nextproductid is the name of the folder
  let result = await NextProduct.findById(requestId);
  return NextResponse.json({ data: result, status: 200 });
}
