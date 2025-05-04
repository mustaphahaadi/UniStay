"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns"

const BookingCalendar = ({
  availableDates = [],
  bookedDates = [],
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  minBookingDays = 1,
  maxBookingDays = 365,
  bookingType = "semester", // semester, monthly, short-term
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hoverDate, setHoverDate] = useState(null)

  // Convert string dates to Date objects if needed
  const parsedAvailableDates = availableDates.map((date) => (typeof date === "string" ? parseISO(date) : date))

  const parsedBookedDates = bookedDates.map((date) => (typeof date === "string" ? parseISO(date) : date))

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleDateClick = (date) => {
    if (!isDateAvailable(date)) return

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start a new selection
      onDateSelect(date, null)
    } else {
      // Complete the selection
      if (date < selectedStartDate) {
        onDateSelect(date, selectedStartDate)
      } else {
        onDateSelect(selectedStartDate, date)
      }
    }
  }

  const handleDateHover = (date) => {
    setHoverDate(date)
  }

  const isDateAvailable = (date) => {
    // Check if date is in available dates or not in booked dates
    if (parsedAvailableDates.length > 0) {
      return parsedAvailableDates.some((availableDate) => isSameDay(availableDate, date))
    } else {
      return !parsedBookedDates.some((bookedDate) => isSameDay(bookedDate, date))
    }
  }

  const isDateInRange = (date) => {
    if (!selectedStartDate) return false
    if (selectedStartDate && selectedEndDate) {
      return date >= selectedStartDate && date <= selectedEndDate
    }
    if (selectedStartDate && hoverDate) {
      return (date >= selectedStartDate && date <= hoverDate) || (date >= hoverDate && date <= selectedStartDate)
    }
    return isSameDay(date, selectedStartDate)
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get day names
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="booking-calendar">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-medium">{format(currentDate, "MMMM yyyy")}</h3>
        <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: monthStart.getDay() }).map((_, index) => (
          <div key={`empty-start-${index}`} className="h-10"></div>
        ))}

        {monthDays.map((day) => {
          const isAvailable = isDateAvailable(day)
          const isSelected =
            (selectedStartDate && isSameDay(day, selectedStartDate)) ||
            (selectedEndDate && isSameDay(day, selectedEndDate))
          const isInRange = isDateInRange(day)

          return (
            <div
              key={day.toString()}
              className={`h-10 flex items-center justify-center rounded-full cursor-pointer ${
                !isAvailable
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isSelected
                    ? "bg-teal-600 text-white"
                    : isInRange
                      ? "bg-teal-100 text-teal-800"
                      : isToday(day)
                        ? "border border-teal-600 text-teal-600"
                        : "hover:bg-gray-100"
              }`}
              onClick={() => isAvailable && handleDateClick(day)}
              onMouseEnter={() => handleDateHover(day)}
              onMouseLeave={() => setHoverDate(null)}
            >
              {format(day, "d")}
            </div>
          )
        })}

        {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
          <div key={`empty-end-${index}`} className="h-10"></div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-teal-600 mr-2"></div>
          <span>Selected Date</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-teal-100 mr-2"></div>
          <span>Date Range</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-gray-100 mr-2"></div>
          <span>Unavailable</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          {bookingType === "semester" && "Select semester start and end dates"}
          {bookingType === "monthly" && "Select move-in and move-out dates (minimum 30 days)"}
          {bookingType === "short-term" && `Select check-in and check-out dates (${minBookingDays} days minimum)`}
        </p>
      </div>
    </div>
  )
}

export default BookingCalendar
