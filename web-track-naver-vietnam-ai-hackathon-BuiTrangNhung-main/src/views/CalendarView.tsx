import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useActivities } from "../context/ActivityProvider";

const CalendarView: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { activities } = useActivities();

  const filteredActivities = activities.filter((activity) => {
    if (!activity.date) return false;
    const activityDate = new Date(activity.date).toDateString();
    return activityDate === date.toDateString();
  });

  return (
    <div style={{ display: "flex", gap: 24, padding: 24 }}>
      {/* Phần lịch bên trái */}
      <div style={{ flex: 1 }}>
        <h2>Lịch hoạt động</h2>
        <Calendar onChange={setDate} value={date} />
        <p style={{ marginTop: 12 }}>
          Ngày đã chọn: {date.toLocaleDateString()}
        </p>
      </div>

      {/* Phần danh sách bên phải */}
      <div style={{ flex: 2 }}>
        <h3>Hoạt động trong ngày</h3>
        {filteredActivities.length === 0 ? (
          <p style={{ color: "#000" }}>Không có hoạt động nào</p>
        ) : (
          filteredActivities.map((a) => (
            <div
              key={a.id}
              style={{
                padding: "12px",
                marginBottom: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#f9f9f9",
                color: "#000", // màu chữ đen
              }}
            >
              <strong>{a.name}</strong> • {a.duration}h • {a.cost}₫
              <br />
              <small>{new Date(a.date).toLocaleTimeString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarView;
