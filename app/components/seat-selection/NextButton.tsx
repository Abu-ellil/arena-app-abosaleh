"use client";

import { colors } from "@/app/styles/colors";
import { useSeatStore } from "@/lib/seat-store";
import { useCurrency } from "../CurrencyProvider";
import Link from "next/link";

interface NextButtonProps {
  eventId: string;
}

export default function NextButton({ eventId }: NextButtonProps) {
  const { selectedSeats, getTotalPrice, getSelectedCount } = useSeatStore();
  const { formatPrice } = useCurrency();

  const totalPrice = getTotalPrice();
  const selectedCount = getSelectedCount();
  const isDisabled = selectedCount === 0;

  if (selectedCount === 0) {
    return null;
  }

  // Format seats with complete data: seatId:category:price
  const formattedSeats = selectedSeats.map(seat => 
    `${seat.id}:${seat.category}:${seat.price}`
  ).join(',');
  const checkoutUrl = `/checkout?eventId=${eventId}&seats=${formattedSeats}&total=${totalPrice}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50">
      {/* Selected Seats Summary */}
      <div className="mb-4 max-h-32 overflow-y-auto">
        <h3 className="font-bold mb-2 text-sm">
          التذاكر المختارة ({selectedCount})
        </h3>
        <div className="space-y-1">
          {selectedSeats.map((seat) => (
            <div
              key={seat.id}
              className="flex justify-between text-sm bg-gray-800 p-2 rounded"
            >
              <span>
                {seat.section} - مقعد {seat.row}
                {seat.number} - {seat.category}
              </span>
              <span className="font-medium">{formatPrice(seat.price)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total and Next Button */}
      <div className="flex items-center justify-between w-full">
        <Link
          href={checkoutUrl}
          className={`
            flex items-center gap-2 w-full justify-center rounded-lg font-bold text-lg transition-colors
            ${isDisabled
              ? "bg-gray-600 text-gray-400 cursor-not-allowed px-6 py-3"
              : "bg-gray-900 px-6 py-3 text-white text-center "
            }
          `}
        >


          <div className="flex w-full justify-center">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[1px] rounded-lg w-full">
              <div className="flex px-2 py-2 rounded-lg text-white text-center  transition-colors items-center justify-center"
              style={{
                backgroundColor: `${colors.background}`,
              }}
              >
                <span className="text-sm flex w-full items-center gap-2 justify-between">
                  الدفع

                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17L7 7M7 7h6m-6 0v6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>



        </Link>
      </div>


    </div>
  );
}
