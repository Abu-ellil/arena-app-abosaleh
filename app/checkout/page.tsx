"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCurrency } from "../components/CurrencyProvider";


// Function to format date in Arabic
function formatArabicDate(dateString: string): string {
  const date = new Date(dateString);

  const arabicDays = [
    "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
  ];

  const arabicMonths = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const dayName = arabicDays[date.getDay()];
  const day = date.getDate();
  const month = arabicMonths[date.getMonth()];
  

  // Format time in 12-hour format
 

  return `${dayName}, ${day} ${month}, `;
}

export default function CheckoutPage() {
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventId = searchParams.get("eventId");
  const seatsParam = searchParams.get("seats");
  const total = searchParams.get("total") || "0";
  const setPrice = searchParams.get("setPrice") || null; // Optional set price parameter

  const [event, setEvent] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7 * 60); // 7 minutes in seconds

  // User information form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    countryCode: "965+" // Default to Kuwait
  });

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Country codes with Arabic countries prioritized
  const countries = [
    // Arabic Countries (prioritized)
    { code: "965+", name: "Kuwait", flag: "🇰🇼", nameAr: "الكويت" },
    { code: "966+", name: "Saudi Arabia", flag: "🇸🇦", nameAr: "السعودية" },
    { code: "971+", name: "UAE", flag: "🇦🇪", nameAr: "الإمارات" },
    { code: "974+", name: "Qatar", flag: "🇶🇦", nameAr: "قطر" },
    { code: "973+", name: "Bahrain", flag: "🇧🇭", nameAr: "البحرين" },
    { code: "968+", name: "Oman", flag: "🇴🇲", nameAr: "عمان" },
    { code: "962+", name: "Jordan", flag: "🇯🇴", nameAr: "الأردن" },
    { code: "961+", name: "Lebanon", flag: "🇱🇧", nameAr: "لبنان" },
    { code: "963+", name: "Syria", flag: "🇸🇾", nameAr: "سوريا" },
    { code: "964+", name: "Iraq", flag: "🇮🇶", nameAr: "العراق" },
    { code: "20+", name: "Egypt", flag: "🇪🇬", nameAr: "مصر" },
    { code: "212+", name: "Morocco", flag: "🇲🇦", nameAr: "المغرب" },
    { code: "213+", name: "Algeria", flag: "🇩🇿", nameAr: "الجزائر" },
    { code: "216+", name: "Tunisia", flag: "🇹🇳", nameAr: "تونس" },
    { code: "218+", name: "Libya", flag: "🇱🇾", nameAr: "ليبيا" },
    { code: "249+", name: "Sudan", flag: "🇸🇩", nameAr: "السودان" },
    { code: "967+", name: "Yemen", flag: "🇾🇪", nameAr: "اليمن" },
    // Other Countries
    { code: "1+", name: "United States", flag: "🇺🇸", nameAr: "الولايات المتحدة" },
    { code: "44+", name: "United Kingdom", flag: "🇬🇧", nameAr: "المملكة المتحدة" },
    { code: "33+", name: "France", flag: "🇫🇷", nameAr: "فرنسا" },
    { code: "49+", name: "Germany", flag: "🇩🇪", nameAr: "ألمانيا" },
    { code: "39+", name: "Italy", flag: "🇮🇹", nameAr: "إيطاليا" },
    { code: "34+", name: "Spain", flag: "🇪🇸", nameAr: "إسبانيا" },
    { code: "31+", name: "Netherlands", flag: "🇳🇱", nameAr: "هولندا" },
    { code: "41+", name: "Switzerland", flag: "🇨🇭", nameAr: "سويسرا" },
    { code: "43+", name: "Austria", flag: "🇦🇹", nameAr: "النمسا" },
    { code: "32+", name: "Belgium", flag: "🇧🇪", nameAr: "بلجيكا" },
    { code: "46+", name: "Sweden", flag: "🇸🇪", nameAr: "السويد" },
    { code: "47+", name: "Norway", flag: "🇳🇴", nameAr: "النرويج" },
    { code: "45+", name: "Denmark", flag: "🇩🇰", nameAr: "الدنمارك" },
    { code: "358+", name: "Finland", flag: "🇫🇮", nameAr: "فنلندا" },
    { code: "91+", name: "India", flag: "🇮🇳", nameAr: "الهند" },
    { code: "86+", name: "China", flag: "🇨🇳", nameAr: "الصين" },
    { code: "81+", name: "Japan", flag: "🇯🇵", nameAr: "اليابان" },
    { code: "82+", name: "South Korea", flag: "🇰🇷", nameAr: "كوريا الجنوبية" },
    { code: "65+", name: "Singapore", flag: "🇸🇬", nameAr: "سنغافورة" },
    { code: "60+", name: "Malaysia", flag: "🇲🇾", nameAr: "ماليزيا" },
    { code: "66+", name: "Thailand", flag: "🇹🇭", nameAr: "تايلاند" },
    { code: "84+", name: "Vietnam", flag: "🇻🇳", nameAr: "فيتنام" },
    { code: "63+", name: "Philippines", flag: "🇵🇭", nameAr: "الفلبين" },
    { code: "62+", name: "Indonesia", flag: "🇮🇩", nameAr: "إندونيسيا" },
    { code: "61+", name: "Australia", flag: "🇦🇺", nameAr: "أستراليا" },
    { code: "64+", name: "New Zealand", flag: "🇳🇿", nameAr: "نيوزيلندا" },
    { code: "55+", name: "Brazil", flag: "🇧🇷", nameAr: "البرازيل" },
    { code: "52+", name: "Mexico", flag: "🇲🇽", nameAr: "المكسيك" },
    { code: "54+", name: "Argentina", flag: "🇦🇷", nameAr: "الأرجنتين" },
    { code: "56+", name: "Chile", flag: "🇨🇱", nameAr: "تشيلي" },
    { code: "57+", name: "Colombia", flag: "🇨🇴", nameAr: "كولومبيا" },
    { code: "51+", name: "Peru", flag: "🇵🇪", nameAr: "بيرو" },
    { code: "27+", name: "South Africa", flag: "🇿🇦", nameAr: "جنوب أفريقيا" },
    { code: "234+", name: "Nigeria", flag: "🇳🇬", nameAr: "نيجيريا" },
    { code: "254+", name: "Kenya", flag: "🇰🇪", nameAr: "كينيا" },
    { code: "233+", name: "Ghana", flag: "🇬🇭", nameAr: "غانا" },
    { code: "7+", name: "Russia", flag: "🇷🇺", nameAr: "روسيا" },
    { code: "90+", name: "Turkey", flag: "🇹🇷", nameAr: "تركيا" },
    { code: "98+", name: "Iran", flag: "🇮🇷", nameAr: "إيران" },
    { code: "92+", name: "Pakistan", flag: "🇵🇰", nameAr: "باكستان" },
    { code: "880+", name: "Bangladesh", flag: "🇧🇩", nameAr: "بنغلاديش" },
    { code: "94+", name: "Sri Lanka", flag: "🇱🇰", nameAr: "سريلانكا" },
    { code: "977+", name: "Nepal", flag: "🇳🇵", nameAr: "نيبال" },
    { code: "93+", name: "Afghanistan", flag: "🇦🇫", nameAr: "أفغانستان" }
  ];

  const selectedCountry = countries.find(country => country.code === formData.countryCode) || countries[0];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Redirect to main page when time expires
          router.push("/");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  useEffect(() => {
    if (!eventId) return;

    const fetchEventData = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
        }
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    if (!seatsParam) return;

    // Parse seat data from URL - expect format: seatId:category:price,seatId:category:price
    // Example: seats=seat-3355:VVIP:800,seat-3054:VIP:400,seat-3389:Royal:500
    const seats = seatsParam.split(",").map(seatInfo => {
      if (!seatInfo || !seatInfo.includes(':')) {
        return null;
      }
      const [id, category, price] = seatInfo.split(":");
      return {
        id: id || "",
        row: id ? id.split('-')[1] || 'A' : 'A',
        number: id ? parseInt(id.split('-')[2]) || 1 : 1,
        section: category || "عام",
        category: category || "عام",
        price: parseFloat(price) || 0,
        status: 'selected' as const
      };
    }).filter(seat => seat && seat.id); // Filter out empty/null seats
    
    setSelectedSeats(seats);
  }, [seatsParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "الاسم مطلوب";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!agreeTerms) {
      newErrors.terms = "يجب الموافقة على الشروط والأحكام";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (!validateForm()) {
      return;
    }

    // Format seats with category and price: seatId:category:price
    const formattedSeats = selectedSeats.map(seat => 
      `${seat.id}:${seat.category}:${seat.price}`
    ).join(',');

    // Calculate total from selected seats
    const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    // Construct payment URL with optional setPrice parameter
    let paymentUrl = `/payment?eventId=${eventId}&seats=${formattedSeats}&total=${totalAmount}&fullName=${encodeURIComponent(formData.fullName)}&phone=${encodeURIComponent(formData.phone)}&email=${encodeURIComponent(formData.email)}`;
    
    // Add setPrice parameter if provided
    if (setPrice) {
      paymentUrl += `&setPrice=${encodeURIComponent(setPrice)}`;
    }

    router.push(paymentUrl);
  };

  const handleChangeSeats = () => {
    router.push(`/event/${eventId}`);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24 font-sans flex flex-col items-center px-2">
      {/* Header with Timer and Change Seats */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/8 px-6 py-4 w-full">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 border-0 rounded-full text-white cursor-pointer transition-all duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5m7-7l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>


        </div>
      </div>

      <div className="text-center  font-bold bg-[#1f2430]  w-full h-12 flex items-center justify-center rounded-md mt-4">
        أكمل حجزك قبل نفاذ الوقت {formatTime(timeLeft)}
      </div>
      <div className="max-w-md mx-auto ">
        {/* Event Info */}
        {event && (
          <div className="p-6 bg-[#1f2430] rounded-md my-6">
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="flex-1 text-right">
                <h1 className="text-xl font-bold leading-tight text-white mb-2">{event.title}</h1>
                <p className="text-lg font-normal text-gray-400 leading-snug">
                  {event.date && event.date.length > 0 ? formatArabicDate(event.date[0]) : ""} 9:00 PM
                </p>
                <p className="text-lg font-normal text-gray-400 leading-snug">
                  {formatPrice(parseFloat(total))}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* User Information Form */}
        <div className="py-4 px-4 bg-[#1f2430] rounded-md">
          <div className="">
            <h2 className="text-lg font text-white mb-5 text-right">أكمل تفاصيل الحجز للمتابعة</h2>

            <div className="space-y-4">
              {/* Phone Number */}
              <div>
                <label className="block text-right text-gray-200  mb-1">
                  رقم الهاتف
                </label>
                <div className="flex items-center bg-[#1f2736] border border-gray-600 rounded-md ">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="********"
                    className="flex-1 ml-2 rounded-lg text-sm text-white bg-[#1f2736] h-full focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <div className="relative flex-row-reverse bg-gray-800">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="flex items-center   rounded-lg px-3 py-1 text-sm hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-colors min-w-[100px]"
                    >
                      <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="text-white text-sm font-medium">{selectedCountry.code}</span>
                      <span className="text-base mr-2" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>{selectedCountry.flag}</span>
                    </button>

                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, countryCode: country.code }));
                              setShowCountryDropdown(false);
                            }}
                            className="w-full flex items-center px-3 py-2.5 text-sm text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors border-b border-gray-700 last:border-b-0"
                          >
                            <span className="text-base mr-3" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>{country.flag}</span>
                            <span className="flex-1 text-right font-medium">{country.nameAr}</span>
                            <span className="text-gray-400 text-xs ml-2">{country.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 text-right">{errors.phone}</p>}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-right text-gray-100 text-lg mb-1 px-1">
                  الاسم
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your name..."
                  className="w-full p-2 border border-gray-600 rounded-md text-sm text-white bg-[#1f2430] focus:border-blue-500 focus:outline-none"
                  required
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1 text-right">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-right text-gray-100  mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="********"
                  className="w-full p-2 border border-gray-600 rounded-md text-sm text-white bg-[#1f2430] focus:border-blue-500 focus:outline-none"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 text-right">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-8"></div>

          {/* Terms and Conditions */}
          <div className="py-8">
            <h3 className="text-lg font-bold text-white mb-5 text-right">الشروط والأحكام</h3>

            <div className="flex flex-col gap-4">
              <label className="flex items-start gap-3 cursor-pointer flex-row-reverse">

                <span className="text-right text-sm font-normal text-white leading-snug h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2b2b2b] scrollbar-track-gray-800">
                  يُسمح بالدخول إلى الأرينا ما بين 60-90 دقيقة قبل وقت بدء العرض.
                  لحجز مقاعد ذوي الاحتياجات الخاصة، يرجى الاتصال بمكتب تذاكر الأرينا كويت على هاتف: 25362453.
                  لا يُسمح بدخول عربات الأطفال إلى القاعة ويجب تركها في مناطق محددة عند المداخل.
                  جميع المتعلقات الشخصية هي مسئولية كاملة على حاملها تمامًا دون أي مسؤولية على الأرينا كويت.
                  يُسمح فقط للأعمار من 8 أعوام فما فوق بدخول الفعالية.
                  لا يسمح بدخول أي زائر دون ال 16 عامًا إلا بصحبة شخص بالغ يزيد عمره عن 18 عامًا
                  لا يُسمح بكاميرات احترافية أو مسجلات صوت أو فيديو
                  لا يسمح بدخول الحقائب التي يزيد حجمها عن 30 × 30 × 15 سم إلى القاعة. تتوفر أماكن تخزين الأغراض في منطقة شباك التذاكر في الطابق M2.
                  سيتم فحص جميع التذاكر الإلكترونية في جميع نقاط الدخول. يرجى التأكد من تحميل التذاكر على الهواتف الشخصية.
                  يتم التشجيع على دفع النقود عبر البطاقات البنكية في جميع أنحاء الأرينا كويت.
                  تعتمد الأرينا كويت سياسات صارمة بشأن المواد المحظورة التي لا يمكن إحضارها إلى المكان. يرجى التحقق من قائمة المواد المحظورة لديناhttps://www.thearenakuwait.com/your-visit
                  ممنوع الدخول مرة أخرى: تمنح التذكرة الدخول لمرة واحدة إلى الأرينا كويت، دون أي حق في الدخول مرة أخرى.
                  لا يُسمح بدخول أي مأكولات أو مشروبات من خارج الأرينا كويت. ويسمح فقط بتناول المأكولات والمشروبات التي يتم شراؤها من نقاط البيع داخل الأرينا كويت.
                  التدخين غير مسموح به في المبنى بما في ذلك السجائر الإلكترونية، ولا يسمح أيضا باستخدام الولاعات وأعواد الثقاب داخل الأرينا كويت.
                  على الزائرين الالتزام بالجلوس دائما أثناء العرض، ولا يسمح بالوقوف أو الرقص.
                  شروط وأحكام التذاكر:

                  الأرينا كويت هي المصدر الحصري الوحيد والمعتمد لخدمات بيع التذاكر لجميع الفعاليات في الأرينا كويت ما لم يتم الإخطار بخلاف ذلك رسميًا من قبل ادارة الأرينا كويت.
                  التذاكر المباعة من خلال أي مصادر أخرى غير معتمدة سيتم اعتبارها ملغية فور اكتشافها.
                  يسمح بحد أقصى عشرة تذاكر لكل عملية شراء.
                  يحق لإدارة الأرينا كويت رفض دخول أي شخص يقدم تذكرة فعالية تم شراؤها من أي مصدر غير معتمد من قبل الإدارة، دون أي استرداد أو تعويض لقيمة التذاكر.
                  التذاكر المباعة صالحة فقط لتاريخ ووقت الفعالية المذكور فيها ويجب تقديمها أثناء الدخول والاحتفاظ بها حتى نهاية الفعالية.
                  يقتصر استرداد واستبدال التذاكر على حالات معينة بناءً على سياسة الاسترداد والتبديل كما هو موضح في موقعنا الالكتروني.
                  في حالة إلغاء الفعالية أو إعادة جدولتها، ستقوم الأرينا كويت بتقديم تفاصيل استرداد ثمن التذكرة أو استبدالها.
                  قد تخضع عملية الدخول الى الأرينا كويت لقيود عمرية محددة على موقعنا الالكتروني، ولاشتراطات أمنية أو صحية مختلفة وفق ما تفرضه الجهات الرسمية أو يتم نشرة على موقعنا الالكتروني.
                  التذاكر المباعة غير قابلة لإعادة البيع أو التنازل أو التحويل للآخرين.
                  أي تذاكر يتم نسخها أو اعادة بيعها أو التنازل عنها أو تحويلها للغير أو استخدامها لأغراض اعلانية وتسويقية، أو أي من الأغراض التجارية الأخرى، فإنها تكون قابلة للإلغاء الفوري.
                  في حال تعرضت التذكرة لأي تغيير أو تعديل أو تلف فإنها تصبح غير صالحة / لاغية على الفور.
                  يوافق حامل التذكرة على الخضوع لأي تفتيش عن أي مواد محظورة بما في ذلك، على سبيل المثال لا الحصر: أجهزة التسجيل، المأكولات والمشروبات، المواد المصنوعة من الزجاج، حقائب الظهر، الحقائب التي تتجاوز الحجم المسموح به والمواد الخاضعة للرقابة أو الخطرة. يمكن الاطلاع على القائمة الكاملة بشروط الدخول والمواد المحظورة على موقعنا الالكتروني.
                  يقر حامل التذكرة بتفهمه لطبيعة الفعالية ويتحمل طواعية كافة المخاطر المرتبطة بالفعالية سواء حدثت قبل بدأ الفعالية أو أثناءها أو بعدها.
                  يجب الالتزام بقواعد المظهر العام والآداب العامة بما يتماشى مع ثقافة وقيم وتقاليد دولة الكويت.
                  تحتفظ الأرينا كويت بالحق في إضافة، أو سحب، أو إعادة جدولة، أو استبدال فنانين، و/أو اجراء تعديل على البرامج التي تم الاعلان عنها أو على الأسعار أو على ترتيبات المقاعد وعدد الحضور.
                  تتحدد أوقات فتح أبواب الدخول وفقا لجدول الفعاليات والأوقات المعلن عنها، وتتراوح بشكل عام بين 60 الى 90 دقيقة قبل انطلاق الفعالية (يرجى التحقق من تفاصيل الفعالية لمعرفة الوقت المحدد للحضور (
                  تحتفظ الأرينا كويت - ودون التزامها برد قيمة التذاكر أو أداء أي تعويض - برفض دخول أو طلب خروج حامل التذكرة في حال الإخلال بالنظام و/أو الاتيان بفعل غير اخلاقي و/أو غير ملائم و/أو يهدد الأمن والسلامة، وكذلك في حال ما إذا قام بأي تصرف يكون من شأنه اثارة الشغب أو اعاقة الآخرين من الاستمتاع بالفعالية.
                  يرجى زيارة موقعنا الالكتروني للاطلاع على كافة الشروط والأحكام   https://www.thearenakuwait.com/your-visit
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs text-right">{errors.terms}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-blue-500 cursor-pointer border border-white"
                />
                <span className="text-right text-xs font-normal text-white leading-relaxed">
                  اوافق على الشروط والأحكام
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs mt-1 text-right">{errors.terms}</p>}
            </div>
          </div>
        </div>

        {/* Sticky Payment Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 p-4">
          <div className="max-w-md mx-auto flex items-center justify-between gap-4">



          </div>

          <div onClick={handleProceedToPayment} className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[1px] rounded-lg w-full">
            <div className="flex px-2 py-2 rounded-lg text-white text-center transition-colors items-center justify-center bg-gray-950">
              <span className="text-sm flex w-full items-center gap-2 justify-between">
                الدفع

                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17L7 7M7 7h6m-6 0v6" />
                </svg>
              </span>
            </div>
          </div>



        </div>
      </div>
    </div>

  );
}
