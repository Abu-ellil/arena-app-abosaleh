"use client";

import { useSeatStore } from "@/lib/seat-store";
import { useCurrency } from "../CurrencyProvider";

const categoryInfo = {
  VVIP: { color: "bg-purple-500", icon: "●", name: "VVIP", nameAr: "كراسي ارضية" },
  VIP: { color: "bg-red-500", icon: "●", name: "VIP", nameAr: "كراسي ارضية" },
  Royal: { color: "bg-green-500", icon: "●", name: "Royal", nameAr: "كراسي ارضية" },
  Diamond: { color: "bg-blue-500", icon: "●", name: "Diamond", nameAr: "كراسي ارضية" },
  Platinum: { color: "bg-purple-400", icon: "●", name: "Platinum", nameAr: "كراسي مدرجات" },
  Gold: { color: "bg-yellow-500", icon: "●", name: "Gold", nameAr: "كراسي ارضية" },
  Silver: { color: "bg-gray-400", icon: "●", name: "Silver", nameAr: "كراسي أساسية" },
  Bronze: { color: "bg-orange-500", icon: "●", name: "Bronze", nameAr: "كراسي مميزات" },
};

export default function Legend() {
  const { seats } = useSeatStore();
  const { currency } = useCurrency();

  console.log("seats", seats[2].category);

  // Get unique categories from seats
  const availableCategories = Array.from(
    new Set(seats.map((seat) => seat.category))
  ).sort((a, b) => {
    const order = [
      "VVIP",
      "VIP",
      "Royal",
      "Diamond",
      "Platinum",
      "Gold",
      "Silver",
      "Bronze",
    ];
    return order.indexOf(a) - order.indexOf(b);
  });

  const getCategoryStats = (category: string) => {
    const categorySeats = seats.filter((seat) => seat.category === category);
    const available = categorySeats.filter(
      (seat) => seat.status === "available"
    ).length;
    const selected = categorySeats.filter(
      (seat) => seat.status === "selected"
    ).length;
    const booked = categorySeats.filter(
      (seat) => seat.status === "booked"
    ).length;

    const prices = categorySeats.map((seat) => seat.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return { available, selected, booked, minPrice, maxPrice };
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg max-w-xs">
      <div className="space-y-2">
        {availableCategories.map((category) => {
          const info = categoryInfo[category as keyof typeof categoryInfo];
          const stats = getCategoryStats(category);

          // Skip if category info is not found
          if (!info) {
            return null;
          }

          return (
            <div key={category} className="flex flex-col justify-between text-sm">

              <div className="flex items-end gap-2">
                <div className="flex items-center gap-2">
                <span className={`text-5xl ${info.color.replace('bg-', 'text-')}`}>
                  {info.icon}
                </span>
                   
                <div className="text-lg font-light">
                  {info.name}
                </div>
                  <div className="text-sm font-light">
                    {stats.minPrice} {currency.symbol}
                  </div>
                </div>
              </div>
           
                  <div className="text-sm text-gray-400">
                    {info.nameAr}
                  </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
