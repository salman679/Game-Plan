import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Calendar as CalendarIcon,
} from "lucide-react";
import Button from "../../ui/Button";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2)); // March 2024

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust for Monday start

    const days = [];

    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate();
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  const events = [
    { id: 1, title: "untitled plan( Chat )", date: 15, time: "All available" },
    { id: 2, title: "untitled plan( Text )", date: 15, time: "All available" },
  ];

  const [recentPlans] = useState([
    { id: 1, name: "Last chat", status: "recent" },
    { id: 2, name: "Last chat", status: "recent" },
    { id: 3, name: "Last chat", status: "recent" },
  ]);

  const [savedClasses] = useState([
    { id: 1, name: "Last chat", status: "saved" },
    { id: 2, name: "Last chat", status: "saved" },
    { id: 3, name: "Last chat", status: "saved" },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex flex-col bg-white border-r border-gray-200 w-80">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
              <span className="text-sm font-bold text-white">GP</span>
            </div>
            <span className="font-semibold text-gray-900">gameplan</span>
          </div>

          <Button className="flex items-center w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} />
            New Plans
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <CalendarIcon size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Calendar
              </span>
            </div>

            <button className="w-full p-3 mb-4 text-left transition-colors rounded-lg hover:bg-gray-50">
              <span className="text-sm text-gray-600">Create Class</span>
            </button>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Recent plans
                </span>
                <span className="text-xs text-gray-500">All filters</span>
              </div>
              <div className="space-y-1">
                {recentPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                  >
                    <span className="text-sm text-gray-600">{plan.name}</span>
                    <MoreHorizontal size={14} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Save Class
                </span>
                <span className="text-xs text-gray-500">All filters</span>
              </div>
              <div className="space-y-1">
                {savedClasses.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                  >
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <MoreHorizontal size={14} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full text-indigo-600 border-indigo-600 hover:bg-indigo-50"
          >
            Upgrade To Pro
          </Button>
        </div>
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 p-8">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="flex items-center justify-center w-10 h-10 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="flex items-center justify-center w-10 h-10 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-4 mb-4">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="py-2 text-sm font-medium text-center text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-4">
              {days.map((dayObj, index) => (
                <div
                  key={index}
                  className={`aspect-square flex flex-col items-center justify-center text-sm border rounded-lg transition-colors ${
                    dayObj.isCurrentMonth
                      ? dayObj.isToday
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-gray-200 hover:bg-gray-50"
                      : "text-gray-400 border-gray-100"
                  }`}
                >
                  <span className="font-medium">{dayObj.day}</span>
                </div>
              ))}
            </div>

            {/* Events */}
            <div className="mt-8 space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-indigo-200 rounded-lg bg-indigo-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-indigo-600 rounded-lg">
                        {event.date}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600">{event.time}</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
