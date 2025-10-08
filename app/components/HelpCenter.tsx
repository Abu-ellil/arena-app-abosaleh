"use client";

import Image from "next/image";
import Link from "next/link";

export default function HelpCenter() {
    return (
        <section className="bg-gray-900 text-white py-16 px-4">
            <Link href={"/"} className="mb-8">
                <h1 className="text-2xl mb-8">المزايا والحلول
                </h1>
                <Image
                    src="/new/download.jpg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-full "
                />
                <div>
                    <p>
                        الأرينا كويت هي قاعة مغطاة متعددة الاغراض ، صممت وفق اعلى المعايير العالمية لإقامة مختلف أنواع الفعاليات، وذلك بهدف الارتقاء بصناعة الترفيه نحو مستويات جديدة من الإنجاز والتقدم في الكويت. تم إنشاء الأرينا كويت لتكون وجهة الترفيه الرائدة محلياً، ولدعم موقع الكويت الاستراتيجي كمقصد ترفيهيٍّ إقليمي وعالمي، وذلك عبر توفير خيارات متكاملة لاستضافة مختلف أنواع الفعاليات. تضم الأرينا كويت مقاعد باعدادات مختلفة لكي تتناسب مع جميع انواع الفعاليات لعدد يتراوح بين 1,200 و 5,800 شخص


                    </p>
                    <div className="flex my-4 mb-8">
                        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[1px] rounded-lg ">
                            <div className="flex bg-gray-900 px-6 py-1 rounded-lg text-white text-center hover:bg-gray-800 transition-colors items-center justify-center">
                                <span className="text-sm flex items-center gap-2">
                                    للمزيد
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17L7 7M7 7h6m-6 0v6" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <Link href={"/"} className="mb-8">
                <h1 className="text-2xl mb-8 font-bold">تجربة كبار الشخصيات

                </h1>
                <Image
                    src="/new/download (1).jpg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-full "
                />
                <div>
                    <p>تتضمن الأرينا كويت 16 جناحًا فاخراً مجهزاً بالكامل وذلك بهدف تحقيق أقصى مقاييس الرفاهية والفخامة لتوفير تجربة استثنائية لا تُنسى ولتعزيز تجربة العروض الحية بالأرينا. تتميز الأجنحة بتصميم رحب بحيث يستوْعِب كل جناح من أجنحة كبار الشخصيات للضيافة ما يصل إلى 10 أشخاص. كما تم تصميم جناحين من أجنحة كبار الشخصيات بخاصية تمكن من دمجهما، وذلك للراغبين في استضافة ما يصل إلى 20 شخصاً، بكل رحابة.

                    </p>
                    <div className="flex my-4 mb-8">
                        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[1px] rounded-lg ">
                            <div className="flex bg-gray-900 px-6 py-1 rounded-lg text-white text-center hover:bg-gray-800 transition-colors items-center justify-center">
                                <span className="text-sm flex items-center gap-2">
                                    للمزيد
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17L7 7M7 7h6m-6 0v6" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className=" mb-12">
                    <h2 className="text-2xl font-bold mb-4">مركز المساعدة</h2>
                </div>

                {/* Help Center Cards */}
                <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto mb-16">
                    {/* Contact Us */}
                    <div className="bg-gradient-to-r from-yellow-400 to-blue-600 p-3 rounded-md flex items-center justify-between cursor-pointer hover:scale-105 transition-transform">
                        <div className="flex items-center gap-4">
                            <div className="">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">اتصل بنا</h3>
                        </div>
                        <div className="bg-black bg-opacity-90 rounded-full p-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7l10 10" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 7H7v10" />
                            </svg>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="bg-gradient-to-r from-red-500 to-purple-600 p-3 rounded-md flex items-center justify-between cursor-pointer hover:scale-105 transition-transform">
                        <div className="flex items-center gap-4">
                            <div className="">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">الأسئلة الشائعة</h3>
                        </div>
                        <div className="bg-black bg-opacity-90 rounded-full p-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7l10 10" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 7H7v10" />
                            </svg>
                        </div>
                    </div>

                    {/* How to Reach Us */}
                    <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-3 rounded-md flex items-center justify-between cursor-pointer hover:scale-105 transition-transform">
                        <div className="flex items-center gap-4">
                            <div className="">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">الوصول إلينا</h3>
                        </div>
                        <div className="bg-black bg-opacity-90 rounded-full p-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7l10 10" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 7H7v10" />
                            </svg>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}