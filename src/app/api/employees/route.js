// src/app/api/employees/route.js
import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, designation, email, mobile } = await request.json();

    // Validate input
    if (!name || !designation || !email || !mobile) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await connectDB();
    const db = client.db('employeeDB');

    // Insert employee
    await db.collection('employees').insertOne({
      name,
      designation,
      email,
      mobile,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Employee created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { message: 'Error creating employee' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await connectDB();
    const db = client.db('employeeDB');

    // Fetch employees
    const employees = await db.collection('employees').find().toArray();

    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { message: 'Error fetching employees' },
      { status: 500 }
    );
  }
}