"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Calendar from 'react-calendar';
import Clock from './components/Clock';
import Sidebar from './components/Sidebar';
import 'react-calendar/dist/Calendar.css';
import './globals.css';
import Avatar from 'react-avatar';
import { FiUsers, FiCalendar, FiEdit2, FiTrash2 } from 'react-icons/fi';

const Homepage = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/employees');
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = async (id) => {
    try {
      router.push(`/edit-employee/${id}`);
    } catch (error) {
      console.error('Error editing employee:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const res = await fetch(`/api/employees/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setEmployees(employees.filter(emp => emp._id !== id));
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="flex items-center justify-center space-x-3">
              <FiCalendar className="text-white text-3xl" />
              <h2 className="text-3xl font-bold text-white">
                Calendar & Time
              </h2>
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-around items-center gap-8">
              <div className="w-full md:w-auto shadow-lg rounded-xl overflow-hidden">
                <Calendar onChange={setDate} value={date} className="border-none" />
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl shadow-lg">
                <Clock />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="flex items-center justify-center space-x-3">
              <FiUsers className="text-white text-3xl" />
              <h2 className="text-3xl font-bold text-white">
                Meet Our Team
              </h2>
            </div>
            <p className="text-blue-100 text-center mt-2">
              Our talented team members
            </p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {employees.map((employee, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  <div className="relative mb-3 flex justify-center">
                    <Avatar 
                      name={employee.name} 
                      size="100" 
                      round={true} 
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEdit(employee._id)}
                        className="p-2 bg-white/90 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="p-2 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {employee.name}
                    </h3>
                    <p className="text-sm font-medium text-purple-600">
                      {employee.designation}
                    </p>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-gray-600 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <span>{employee.email}</span>
                      </p>
                      <p className="text-gray-600 flex items-center gap-2 mt-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        <span>{employee.mobile}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
