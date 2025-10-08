"use client";

import { useState } from "react";

export default function NewsletterSection() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setMessage("تم التسجيل بنجاح! شكراً لك.");
            setFormData({ firstName: "", lastName: "", email: "", phone: "" });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        

        
        <div className="bg-gray-900 py-16 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className=" mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        سجل اهتمامك هنا
                    </h2>
                    <p className="text-gray-300 text-md leading-relaxed">
                        لضمان بقائك على إطلاع بآخر مستجداتنا ومعلوماتنا، يرجى تعبئة البيانات التالية لضمان تبعيتك
                        الأسبوعية.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="الاسم الأول"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-right"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="الاسم الأخير"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-right"
                            required
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="البريد الإلكتروني"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-right"
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="رقم الهاتف"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-right"
                        required
                    />

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-lg"></div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative w-[99%] py-2  bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed m-[1px]"
                        >
                            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                        </button>
                    </div>
                </form>

                {message && (
                    <div className="mt-4 p-3 bg-green-600 text-white rounded-lg text-center">
                        {message}
                    </div>
                )}
            </div>
        </div>

    );
}