"use client"

import { useState, useEffect } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { API_URL } from "../config"

const EventsCalendar = ({ hostelId, universityId }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        let url = `${API_URL}/events/`

        if (hostelId) {
          url += `?hostel_id=${hostelId}`
        } else if (universityId) {
          url += `?university_id=${universityId}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }

        const data = await response.json()
        setEvents(
          data.map((event) => ({
            ...event,
            date: new Date(event.date),
          })),
        )
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [hostelId, universityId])

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getEventsForDay = (day) => {
    return events.filter((event) => isSameDay(day, event.date))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-teal-600" />
            Events Calendar
          </h2>

          <div className="flex items-center space-x-2">
            <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-medium">{format(currentMonth, "MMMM yyyy")}</span>
            <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-start-${index}`} className="h-24 p-1 border border-transparent"></div>
            ))}

            {days.map((day) => {
              const dayEvents = getEventsForDay(day)
              const hasEvents = dayEvents.length > 0

              return (
                <div
                  key={day.toString()}
                  className={`h-24 p-1 border rounded-md ${
                    isToday(day) ? "border-teal-600 bg-teal-50" : "border-gray-200 hover:border-teal-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${isToday(day) ? "text-teal-600" : ""}`}>
                      {format(day, "d")}
                    </span>

                    {hasEvents && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-teal-600 text-white rounded-full">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 space-y-1 overflow-y-auto max-h-16">
                    {dayEvents.slice(0, 2).map((event) => (
                      <button
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className="block w-full text-left text-xs truncate px-1 py-0.5 rounded bg-teal-100 text-teal-800"
                      >
                        {event.title}
                      </button>
                    ))}

                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              )
            })}

            {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
              <div key={`empty-end-${index}`} className="h-24 p-1 border border-transparent"></div>
            ))}
          </div>
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-2">{selectedEvent.title}</h3>
            <p className="text-gray-600 mb-4">{format(selectedEvent.date, "EEEE, MMMM d, yyyy")}</p>

            {selectedEvent.time && <p className="text-gray-600 mb-4">Time: {selectedEvent.time}</p>}

            {selectedEvent.location && <p className="text-gray-600 mb-4">Location: {selectedEvent.location}</p>}

            <p className="text-gray-700 mb-6">{selectedEvent.description}</p>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsCalendar
