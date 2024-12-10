// src/app/api/employees/[id]/route.js
import { connectDB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await connectDB();
    const db = client.db('employeeDB');

    const employee = await db.collection('employees').findOne({ _id: new ObjectId(id) });

    if (!employee) {
      return NextResponse.json(
        { message: 'Employee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json(
      { message: 'Error fetching employee' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { name, designation, email, mobile } = await request.json();
    const client = await connectDB();
    const db = client.db('employeeDB');

    const result = await db.collection('employees').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, designation, email, mobile } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Employee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Employee updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json(
      { message: 'Error updating employee' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const client = await connectDB();
    const db = client.db('employeeDB');

    const result = await db.collection('employees').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Employee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Employee deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json(
      { message: 'Error deleting employee' },
      { status: 500 }
    );
  }
}