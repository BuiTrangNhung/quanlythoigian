import React, { useState } from "react";
import "./ListView.css";
import { useActivities, type Activity } from "../context/ActivityProvider";
import ActivityForm from "../components/ActivityForm";
import { isOverdue, isUrgent, hoursUntil } from "../utils/time";

export default function ListView() {
  const { activities, dispatch } = useActivities();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Activity | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Lọc hoạt động theo từ khóa tìm kiếm
  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(query.toLowerCase())
  );

  // Xử lý khi nhấn nút chỉnh sửa
  const handleEdit = (activity: Activity) => {
    setEditing(activity);
    setShowForm(true);
  };

  // Xử lý khi nhấn nút xóa
  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa hoạt động này?")) {
      dispatch({ type: "DELETE", payload: id });
    }
  };

  return (
    <div className="list-view" style={{ padding: 16 }}>
      {/* Thanh tìm kiếm và nút thêm */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => { setEditing(null); setShowForm(true); }}>
          + Thêm hoạt động
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>

      {/* Form thêm/sửa hoạt động */}
      {showForm && (
        <div style={{ marginBottom: 12, padding: 12, background: "#fff", borderRadius: 8 }}>
          <ActivityForm initial={editing} onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Danh sách hoạt động */}
      <div style={{ maxHeight: 420, overflowY: "auto", paddingRight: 8 }}>
        {filteredActivities.length === 0 ? (
          <div>Không có hoạt động nào phù hợp</div>
        ) : (
          filteredActivities.map((activity) => {
            const overdue = isOverdue(activity.date);
            const urgent = isUrgent(activity.date);
            const hours = hoursUntil(activity.date);

            return (
              <div
                key={activity.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 12,
                  marginBottom: 8,
                  borderRadius: 8,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  background: overdue
                    ? "#ffefef"
                    : urgent
                    ? "#fff7e6"
                    : "#ffffff",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{activity.name}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {activity.date
                      ? new Date(activity.date).toLocaleString()
                      : "Không có thời gian"}{" "}
                    • {activity.duration}h • {activity.cost}₫
                  </div>
                  {overdue && (
                    <div style={{ color: "red", fontSize: 12 }}>TRỄ HẠN</div>
                  )}
                  {!overdue && urgent && (
                    <div style={{ color: "orange", fontSize: 12 }}>
                      Còn {Math.max(0, Math.round(hours * 10) / 10)} giờ
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => dispatch({ type: "TOGGLE", payload: activity.id })}>
                    {activity.completed ? "Hoàn tác" : "Hoàn thành"}
                  </button>
                  <button onClick={() => handleEdit(activity)}>Sửa</button>
                  <button onClick={() => handleDelete(activity.id)}>Xóa</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
