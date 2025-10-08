"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { colors } from "../styles/colors";
import { FaTiktok, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';
import { useSettings } from '../hooks/useSettings';

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { settings } = useSettings();
  
  // Use settings whatsappNumber or fallback to default
  const whatsappNumber = settings.whatsappNumber || "+96512345678";

  return (
    <footer className=" text-white" style={{ backgroundColor: colors.background }}>

      {/* Social Media Icons */}
      <div className="flex flex-row-reverse justify-center py-8 gap-4">
        <Link href="#" className="hover:opacity-80 transition-opacity">
          <FaTiktok className="w-4 h-4" />
        </Link>
        <Link href="#" className="hover:opacity-80 transition-opacity">
          <FaYoutube className="w-4 h-4" />
        </Link>
        <Link href="#" className="hover:opacity-80 transition-opacity">
          <FaInstagram className="w-4 h-4" />
        </Link>
        <Link href="#" className="hover:opacity-80 transition-opacity">
          <FaFacebook className="w-4 h-4" />
        </Link>
      </div>

      {/* Footer Links */}
      <div className="flex justify-center gap-4 py-4 text-xs">
        <Link href="/privacy" className="hover:text-gray-300 transition-colors">
          سياسة طلبات الإلغاء
        </Link>
        <Link href="/privacy" className="hover:text-gray-300 transition-colors">
          سياسة الخصوصية
        </Link>
        <Link href="/terms" className="hover:text-gray-300 transition-colors">
          شروط الاستخدام
        </Link>
      </div>


      <div className="border-t border-gray-800  bg-gray-800/30 ">
        {/* Logo Section */}
        <div className="flex justify-center py-4 w-full">
          <div className="text-center flex items-center justify-center gap-4 w-full">
            <div className="text-xs text-gray-400">
              <p>إحدى مشاريع مجموعة التمدين</p>

            </div>
            <div className="mb-4">
              <Image
                src="/new/tamdeen-logo-ar.svg"
                alt="Arena Kuwait Logo"
                width={80}
                height={60}
                className="mx-auto"
                style={{ width: "auto" }}
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className=" py-4 text-center">
          <p className="text-sm text-gray-400">
            © الأرينا كويت 2025. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
      {/* WhatsApp Float Button */}
      {isHomePage && (
        <div className="fixed bottom-6 left-6 z-50">
          <Link
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </Link>
        </div>
      )}
    </footer>
  );
}