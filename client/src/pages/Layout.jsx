import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";  

const Layout = () => {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <section className="flex-1 overflow-y-auto px-4 pb-6 pt-6 max-md:pb-14 sm:px-12 bg-gray-500">
          <div className="w-full">
            {/* 👇 Nested routes (Home, Previous, etc.) yaha render honge */}
            <Outlet />
          </div>
        </section>
      </div>
      <footer className="bg-gray-700 text-gray-300 text-center py-3 text-sm">
        © {new Date().getFullYear()} Fair Forse Meeting. All rights reserved.
      </footer>
    </main>
  );
};

export default Layout;
