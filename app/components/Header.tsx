"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaTiktok, FaYoutube, FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-900 flex items-center justify-between px-4 border-b border-gray-800">
        <div className="text-center">
          <div className="flex justify-center">
            <Link href="/" className="cursor-pointer">
              <div className="text-center">
                <Image
                  src="/tak-logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-25 h-20"
                />
              </div>
            </Link>
          </div>
        </div>

        <button
          className="p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-0 bg-gray-900 flex flex-col">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex-1 px-4 py-4 text-center overflow-y-auto">
              {/* Featured Button */}
              <div className="mb-6">
                <button className="w-5/6 py-2 px-4 bg-gradient-to-r from-orange-700 to-blue-500 text-white font-medium text-sm rounded-md shadow-lg hover:shadow-xl transition-all duration-300">
                  فعالياتنا
                </button>
              </div>

              {/* Menu Items */}
              <nav className="space-y-3">
                <Link
                  href="/"
                  className="block text-sm text-white hover:text-blue-400 transition-colors duration-200 py-2 border-b border-gray-700/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  الصفحة الرئيسية
                </Link>
                <Link
                  href="/"
                  className="block text-sm text-white hover:text-blue-400 transition-colors duration-200 py-2 border-b border-gray-700/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  خطط لزيارتك
                </Link>
                <Link
                  href="/"
                  className="block text-sm text-white hover:text-blue-400 transition-colors duration-200 py-2 border-b border-gray-700/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  إقامة الفعاليات
                </Link>
                <Link
                  href="/"
                  className="block text-sm text-white hover:text-blue-400 transition-colors duration-200 py-2 border-b border-gray-700/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  تجربة كبار الشخصيات
                </Link>
                <Link
                  href="/"
                  className="block text-sm text-white hover:text-blue-400 transition-colors duration-200 py-2 border-b border-gray-700/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  معلومات عنا
                </Link>
                <Link
                  href="/"
                  className="block text-sm text-white hover:text-blue-400 transition-colors duration-200 py-2 border-b border-gray-700/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  اتصل بنا
                </Link>
                <Link
                  href="/"
                  className="block text-sm text-white hover:text-blue-400 transition-colors duration-200 py-2 border-b border-gray-700/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  الأسئلة الشائعة
                </Link>
                <Link
                  href="/"
                  className="block text-sm text-white hover:text-blue-400 transition-colors duration-200 py-2 border-b border-gray-700/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  شركاء الوجهة
                </Link>
                <Link
                  href="/"
                  className="block text-sm text-white hover:text-blue-400 transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  عروض جرائد حياة الكويت
                </Link>
              </nav>

              {/* Social Media Icons */}
              <div className="flex flex-row-reverse justify-center gap-1 mt-8">
                <Link
                  href="/"
                  className="w-10 h-10  flex items-center justify-center hover:bg-black transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaTiktok className="text-white text-lg" />
                </Link>
                <Link
                  href="/"
                  className="w-10 h-10  flex items-center justify-center hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaYoutube className="text-white text-lg" />
                </Link>
                <Link
                  href="/"
                  className="w-10 h-10  flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaInstagram className="text-white text-lg" />
                </Link>
                <Link
                  href="/"
                  className="w-10 h-10  flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaFacebookF className="text-white text-lg" />
                </Link>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="fixed bottom-4 left-4">
              <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:bg-green-600">
                <FaWhatsapp className="text-white text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
