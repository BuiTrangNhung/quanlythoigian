import React from "react";
import { Activity, useActivities } from "../context/ActivityProvider";
import { isOverdue, isUrgent, hoursUntil } from "../utils/time";

export default function ActivityItem({ activity, onEdit }: { activity: Activity; onEdit: (a: Activity) => void; }) {
  const { dispatch } = useActivities();
  const overdue = isOverdue(activity.date);
  const urgent = isUrgent(activity.date);
  const hours = hoursUntil(activity.date);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
      marginBottom: 8,
      borderRadius: 8,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      background: overdue ? "#ffefef" : urgent ? "#fff7e6" : "white"
    }}>
      <div>
        <div style={{ fontWeight: 600 }}>{activity.name}</div>
        <div style={{ fontSize: 12, color: "#666" }}>
          {activity.date ? new Date(activity.date).toLocaleString() : "Không có thời gian"} • {activity.duration}h • {activity.cost}₫
        </div>
        {overdue && <div style={{ color: "red", fontSize: 12 }}>TRỄ HẠN</div>}
        {!overdue && urgent && <div style={{ color: "orange", fontSize: 12 }}>Còn {Math.max(0, Math.round(hours*10)/10)} giờ</div>}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => dispatch({ type: "TOGGLE", payload: activity.id })}>
          {activity.completed ? "Undo" : "Done"}
        </button>
        <button onClick={() => onEdit(activity)}>Edit</button>
        <button onClick={() => { if (confirm("Xóa hoạt động?")) dispatch({ type: "DELETE", payload: activity.id }); }}>Delete</button>
      </div>
    </div>
  );
}
