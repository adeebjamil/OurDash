"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import { FiUser, FiBriefcase, FiMail, FiPhone, FiSave } from 'react-icons/fi';

export default function EditEmployee() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    mobile: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/employees/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to update employee');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
              <div className="flex items-center justify-center space-x-3">
                <FiSave className="text-white text-3xl" />
                <h2 className="text-3xl font-bold text-white">
                  Edit Employee
                </h2>
              </div>
              <p className="text-blue-100 text-center mt-2">
                Update employee details
              </p>
            </div>
            
            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="text-gray-700 text-sm font-semibold mb-2 flex items-center">
                    <FiUser className="mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="relative">
                  <label className="text-gray-700 text-sm font-semibold mb-2 flex items-center">
                    <FiBriefcase className="mr-2" />
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter designation"
                  />
                </div>

                <div className="relative">
                  <label className="text-gray-700 text-sm font-semibold mb-2 flex items-center">
                    <FiMail className="mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="relative">
                  <label className="text-gray-700 text-sm font-semibold mb-2 flex items-center">
                    <FiPhone className="mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <FiSave />
                  <span>Save Changes</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}