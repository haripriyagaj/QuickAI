import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  House,
  PenSquare,
  Hash,
  Image,
  Eraser,
  Scissors,
  Users,
  LogOut,
} from 'lucide-react';

import { Protect, useClerk, useUser } from '@clerk/clerk-react';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: PenSquare },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: Scissors },
  { to: '/ai/community', label: 'Community', Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div
      className={`w-64 bg-white border-r border-gray-200 flex flex-col 
      justify-between h-full max-sm:absolute top-14 bottom-0
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}
      transition-all duration-300 ease-in-out`}
    >
      {/* Logo / User Info */}
      <div className="my-7 w-full text-center">
        <img
          src={user?.imageUrl}
          alt="User avatar"
          className="w-14 h-14 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center font-medium">{user?.fullName}</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          <Protect role="premium" fallback="Free">Premium</Protect>
        </p>
      </div>

      {/* Nav Items */}
      <div className="px-6 flex-1 text-sm text-gray-600 font-medium space-y-1">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/ai'}
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `px-3.5 py-2.5 flex items-center gap-3 rounded transition-colors 
              ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom User Section */}
      <div className="w-full border-t border-gray-200 p-4 flex flex-col items-center">
        {/* Profile Pic */}
        <img
          src={user?.imageUrl}
          className="w-10 h-10 rounded-full mb-2"
          alt="User Avatar"
        />

        {/* Profile Name */}
        <h1 className="text-sm font-medium">{user?.fullName || "John Doe"}</h1>

        {/* Plan */}
        <p className="text-xs text-gray-500 mb-3">
          <Protect plain="premium" fallback="Free">Premium</Protect> Plan
        </p>

        {/* Logout */}
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
