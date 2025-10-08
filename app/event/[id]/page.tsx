"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

import { colors } from "../../styles/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCurrency } from "../../components/CurrencyProvider";

interface EventPageProps {
  params: {
    id: string;
  };
}

interface Seat {
  id: string;
  eventId: string;
  row: string;
  number: number;
  section: string;
  price: number;
  category: string;
  isBooked: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string[];
  venue: string;
  image?: string;
  formattedDates?: { formattedDate: string; formattedTime: string; formattedDayOfWeek: string }[];
  category?: string;
  seats?: Seat[];
}

export default function EventPage({ params }: EventPageProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [bronzeTicketPrice, setBronzeTicketPrice] = useState(250); // default fallback
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false); // State for terms and conditions collapsible
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      setHasOverflow(element.scrollHeight > element.clientHeight);
    }
  }, [event, event?.description]); // State for description expansion







  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`);
        if (response.ok) {
          const data = await response.json();

          // Format dates
          const formattedDates = data.date.map((d: string) => {
            const eventDate = new Date(d);
            const formattedDate = eventDate.toLocaleDateString("ar-EG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            const formattedTime = eventDate.toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            });

            const formattedDayOfWeek = eventDate.toLocaleDateString("ar-EG", {
              weekday: "long",
            });
            return { formattedDate, formattedTime, formattedDayOfWeek };
          });

          setEvent({
            ...data,
            formattedDates,
          });
        } else {
          toast.error("فشل في تحميل بيانات الفعالية");
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
        toast.error("حدث خطأ في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };





    fetchEvent();
  }, [params.id, router]);

  // Fetch bronze ticket price from settings
  useEffect(() => {
    const fetchBronzePrice = async () => {
      try {
        const response = await fetch("/api/settings/bronzeTicketPrice");
        if (response.ok) {
          const data = await response.json();
          setBronzeTicketPrice(parseInt(data.value) || 250);
        }
      } catch (error) {
        console.error("Failed to fetch bronze ticket price:", error);
      }
    };

    fetchBronzePrice();
  }, []);

  // Handle scroll to show/hide floating button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const halfScreen = windowHeight / 2;

      setShowFloatingButton(scrollY > halfScreen);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
         
          <p>جاري تحميل بيانات الفعالية...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen  flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <p className="text-xl mb-4">لم يتم العثور على الفعالية</p>
          <Link href="/" className="text-primary hover:underline">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const getBronzeTicketPrice = () => {
    if (!event?.seats) return bronzeTicketPrice; // use settings price as fallback
    const bronzeSeat = event.seats.find(
      (seat) => seat.category.toLowerCase() === "bronze"
    );
    return bronzeSeat ? bronzeSeat.price : bronzeTicketPrice;
  };



  return (
    <div className="min-h-screen  text-white" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="sticky top-0 z-50  flex items-center justify-between px-4 py-3" style={{ backgroundColor: colors.background }}>


        <div className="flex flex-col">
          {/* <Link href="/" className="flex flex-row">
            <div className="flex text-xs font-light gap-2">
              {event.category}{" "}
              <ChevronLeftIcon className="w-4 h-4 text-white" />
            </div>
          </Link> */}


          <div className="text-center ">
            <h1 className="text-xs font-light mb-2">{event.title}</h1>
          </div>
        </div>
        <div className="flex items-center text-sm font-light text-gray-400 justify-center">
          <button className="flex px-2 py-1 items-center gap-2">
            {/* <ArrowUpOnSquare className="w-6 h-6 text-white" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 28"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>

          </button>
        </div>
      </div>



      <div className="mb-8 relative overflow-hidden ">

        <div className="absolute ">
          <div className="absolute h-[500px] inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-yellow-700 opacity-50 animate-gradient-x blur-3xl"></div>
          <div className="absolute h-[500px] inset-0 bg-gradient-to-br from-blue-900 via-slate-600 to-orange-700 opacity-40 animate-gradient-x-reverse blur-2xl"></div>
          <div className="absolute h-[500px] inset-0 bg-gradient-to-tr from-indigo-900 via-gray-700 to-yellow-700 opacity-50 animate-pulse blur-xl"></div>
        </div>

        {/* Event Image */}
        <div className="relative px-4 mb-6">
          <div className="w-full h- bg-gradient-to-b from-orange-400 to-purple-600 rounded-lg overflow-hidden">
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-orange-400 to-purple-600 flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {event.title}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Event Title */}
        <div className="p-4 mb-6 text-white z-[9999999999]">
          {event.formattedDates && event.formattedDates.length > 0 && (
            <div className="mb-2">
              <p className="text-gray-100 text-sm">
                {event.formattedDates[0].formattedDate} - 9:00
              </p>
              <p className="text-gray-100 text-sm">
                {event.formattedDates[0].formattedDayOfWeek}
              </p>
            </div>
          )}
          <h1 className="text-3xl text-white font-bold mb-2">{event.title}</h1>
          {/* <p className="text-gray-400 text-sm">{event.venue}</p> */}
        </div>








        {/* Description */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold mb-3">عن الفعالية</h3>
          <p
            ref={descriptionRef}
            className={`${isDescriptionExpanded ? '' : 'line-clamp-5'} text-sm/relaxed`}
          >
            {event.description}
          </p>
          {hasOverflow && (
            <button
              className="flex items-center justify-center w-full  hover:underline mt-2 z-10 relative"
              onClick={() => {
                setIsDescriptionExpanded(!isDescriptionExpanded);
              }}
            >
              {isDescriptionExpanded ? (
                <>
                  إخفاء <ChevronUpIcon className="w-5 h-5 ml-1" />
                </>
              ) : (
                <>
                  تابع القراءة <ChevronDownIcon className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
      {/* Divider */}
      <div className="border-t border-gray-700 m-6 p-2"></div>

      {/* Terms */}
      <div className=" px-2 mb-2 pt-2 rounded-lg w-[95%] mx-auto border border-gray-600" style={{ backgroundColor: colors.gray }}>

        <button
          className="flex justify-between items-center w-full py-1 px-2 text-white text-2xl mb-3 "
          onClick={() => setIsTermsOpen(!isTermsOpen)}
        >
          الشروط والأحكام
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isTermsOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {isTermsOpen && (
          <div className="space-y-2 text-lg text-gray-400  p-4 rounded-lg">
            <p>• سياسات دخول الفعالية:</p>
            <p>• يُسمح بالدخول إلى الأرينا ما بين 60-90 دقيقة قبل وقت بدء العرض.</p>
            <p>• لحجز مقاعد ذوي الاحتياجات الخاصة، يرجى الاتصال بمكتب تذاكر الأرينا كويت على هاتف: 25362453.</p>
            <p>• لا يُسمح بدخول عربات الأطفال إلى القاعة ويجب تركها في مناطق محددة عند المداخل.</p>
            <p>• جميع المتعلقات الشخصية هي مسئولية كاملة على حاملها تمامًا دون أي مسؤولية على الأرينا كويت.</p>
            <p>• يُسمح فقط للأعمار من 8 أعوام فما فوق بدخول الفعالية.</p>
            <p>• لا يسمح بدخول أي زائر دون ال 16 عامًا إلا بصحبة شخص بالغ يزيد عمره عن 18 عامًا</p>
            <p>• لا يُسمح بكاميرات احترافية أو مسجلات صوت أو فيديو</p>
            <p>• لا يسمح بدخول الحقائب التي يزيد حجمها عن 30 × 30 × 15 سم إلى القاعة. تتوفر أماكن تخزين الأغراض في منطقة شباك التذاكر في الطابق M2.</p>
            <p>• سيتم فحص جميع التذاكر الإلكترونية في جميع نقاط الدخول. يرجى التأكد من تحميل التذاكر على الهواتف الشخصية.</p>
            <p>• يتم التشجيع على دفع النقود عبر البطاقات البنقية في جميع أنحاء الأرينا كويت.</p>
            <p>• تعتمد الأرينا كويت سياسات صارمة بشأن المواد المحظورة التي لا يمكن إحضارها إلى المكان. يرجى التحقق من قائمة المواد المحظورة لدينا <a href="https://www.thearenakuwait.com/your-visit">https://www.thearenakuwait.com/your-visit</a></p>
            <p>• ممنوع الدخول مرة أخرى: تمنح التذكرة الدخول لمرة واحدة إلى الأرينا كويت، دون أي حق في الدخول مرة أخرى.</p>
            <p>• لا يُسمح بدخول أي مأكولات أو مشروبات من خارج الأرينا كويت. ويسمح فقط بتناول المأكولات والمشروبات التي يتم شراؤها من نقاط البيع داخل الأرينا كويت.</p>
            <p>• التدخين غير مسموح به في المبنى بما في ذلك السجائر الإلكترونية، ولا يسمح أيضا باستخدام الولاعات وأعواد الثقاب داخل الأرينا كويت.</p>
            <p>• على الزائرين الالتزام بالجلوس دائما أثناء العرض، ولا يسمح بالوقوف أو الرقص.</p>
            <p>• شروط وأحكام التذاكر:</p>
            <p>• الأرينا كويت هي المصدر الحصري الوحيد والمعتمد لخدمات بيع التذاكر لجميع الفعاليات في الأرينا كويت ما لم يتم الإخطار بخلاف ذلك رسميًا من قبل ادارة الأرينا كويت.</p>
            <p>• التذاكر المباعة من خلال أي مصادر أخرى غير معتمدة سيتم اعتبارها ملغية فور اكتشافها.</p>
            <p>• يسمح بحد أقصى عشرة تذاكر لكل عملية شراء.</p>
            <p>• يحق لإدارة الأرينا كويت رفض دخول أي شخص يقدم تذكرة فعالية تم شراؤها من أي مصدر غير معتمد من قبل الإدارة، دون أي استرداد أو تعويض لقيمة التذاكر.</p>
            <p>• التذاكر المباعة صالحة فقط لتاريخ ووقت الفعالية المذكور فيها ويجب تقديمها أثناء الدخول والاحتفاظ بها حتى نهاية الفعالية.</p>
            <p>• يقتصر استرداد واستبدال التذاكر على حالات معينة بناءً على سياسة الاسترداد والتبديل كما هو موضح في موقعنا الالكتروني.</p>
            <p>• في حالة إلغاء الفعالية أو إعادة جدولتها، ستقوم الأرينا كويت بتقديم تفاصيل استرداد ثمن التذكرة أو استبدالها.</p>
            <p>• قد تخضع عملية الدخول الى الأرينا كويت لقيود عمرية محددة على موقعنا الالكتروني، ولاشتراطات أمنية أو صحية مختلفة وفق ما تفرضه الجهات الرسمية أو يتم نشرة على موقعنا الالكتروني.</p>
            <p>• التذاكر المباعة غير قابلة لإعادة البيع أو التنازل أو التحويل للآخرين.</p>
            <p>• أي تذاكر يتم نسخها أو اعادة بيعها أو التنازل عنها أو تحويلها للغير أو استخدامها لأغراض اعلانية وتسويقية، أو أي من الأغراض التجارية الأخرى، فإنها تكون قابلة للإلغاء الفوري.</p>
            <p>• في حال تعرضت التذكرة لأي تغيير أو تعديل أو تلف فإنها تصبح غير صالحة / لاغية على الفور.</p>
            <p>• يوافق حامل التذكرة على الخضوع لأي تفتيش عن أي مواد محظورة بما في ذلك، على سبيل المثال لا الحصر: أجهزة التسجيل، المأكولات والمشروبات، المواد المصنوعة من الزجاج، حقائب الظهر، الحقائب التي تتجاوز الحجم المسموح به والمواد الخاضعة للرقابة أو الخطرة. يمكن الاطلاع على القائمة الكاملة بشروط الدخول والمواد المحظورة على موقعنا الالكتروني.</p>
            <p>• يقر حامل التذكرة بتفهمه لطبيعة الفعالية ويتحمل طواعية كافة المخاطر المرتبطة بالفعالية سواء حدثت قبل بدأ الفعالية أو أثناءها أو بعدها.</p>
            <p>• يجب الالتزام بقواعد المظهر العام والآداب العامة بما يتماشى مع ثقافة وقيم وتقاليد دولة الكويت.</p>
            <p>• تحتفظ الأرينا كويت بالحق في إضافة، أو سحب، أو إعادة جدولة، أو استبدال فنانين، و/أو اجراء تعديل على البرامج التي تم الاعلان عنها أو على الأسعار أو على ترتيبات المقاعد وعدد الحضور.</p>
            <p>• تتحدد أوقات فتح أبواب الدخول وفقا لجدول الفعاليات والأوقات المعلن عنها، وتتراوح بشكل عام بين 60 الى 90 دقيقة قبل انطلاق الفعالية (يرجى التحقق من تفاصيل الفعالية لمعرفة الوقت المحدد للحضور (</p>
            <p>• تحتفظ الأرينا كويت - ودون التزامها برد قيمة التذاكر أو أداء أي تعويض - برفض دخول أو طلب خروج حامل التذكرة في حال الإخلال بالنظام و/أو الاتيان بفعل غير اخلاقي و/أو غير ملائم و/أو يهدد الأمن والسلامة، وكذلك في حال ما إذا قام بأي تصرف يكون من شأنه اثارة الشغب أو اعاقة الآخرين من الاستمتاع بالفعالية.</p>
            <p>• يرجى زيارة موقعنا الالكتروني للاطلاع على كافة الشروط والأحكام <a href="https://www.thearenakuwait.com/your-visit">https://www.thearenakuwait.com/your-visit</a></p>
          </div>
        )}
      </div>

      {/* Bottom Navigation Indicator */}
      <div className="flex justify-center pb-10 pt-20">
        <div className="w-[95%] h-[1px] bg-gray-800 rounded-full"></div>

      </div>






      {/* Bottom padding to prevent content from being hidden behind floating button */}
      <div className=""></div>

      {/* Floating Booking Button */}
      <div
        className="fixed bottom-0 left-0 right-0  border-t border-gray-700 p-6 z-50 transition-transform duration-300 rounded-tr-xl rounded-tl-xl"
        style={{ backgroundColor: colors.background }}
      >
        <div className="flex w-full justify-center">
          <div className="bg-gradient-to-r from-blue-500/70 via-purple-300/70 to-orange-500/70 p-[2px] rounded-lg w-full">
            <div className={`flex px-2 py-1 rounded-lg text-white text-center hover:bg-gray-800 transition-colors items-center justify-center`}
              style={{ backgroundColor: colors.background }}
            >

              <Link
                href={`/select-day/${event.id}`}
              >
                <span className="text-sm flex items-center">
                  شراء التذاكر
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 17L7 7M7 7h6m-6 0v6" />
                  </svg>
                </span>
              </Link>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
