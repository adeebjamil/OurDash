// src/app/components/Sidebar.js
"use client";

import Link from 'next/link';
import { FiHome, FiUserPlus, FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: FiHome },
    { href: '/create-employee', label: 'Create Employee', icon: FiUserPlus },
  ];

  return (
    <div className={`min-h-screen ${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-indigo-600 to-blue-700 text-white shadow-xl transition-all duration-300 ease-in-out`}>
      <div className="p-4 border-b border-indigo-800/30">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 text-transparent bg-clip-text">
              Dashboard
            </h1>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-indigo-700/50 transition-colors"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-8 space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="w-[80%]"
            >
              <div
                className={`
                  flex items-center px-4 py-3 rounded-lg
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-white text-indigo-600 shadow-lg' 
                    : 'hover:bg-indigo-500 text-white'
                  }
                `}
              >
                <Icon className={`
                  ${isCollapsed ? 'mx-auto' : 'mr-3'} 
                  text-xl group-hover:scale-110 transition-transform
                `} />
                {!isCollapsed && (
                  <span className="font-medium">
                    {item.label}
                  </span>
                )}
                {!isCollapsed && isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-indigo-600" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}