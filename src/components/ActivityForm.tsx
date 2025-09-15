import React, { useState, useEffect } from "react";
import { useActivities, type Activity } from "../context/ActivityProvider";

type Props = {
  initial?: Activity | null;
  onClose?: () => void;
};

export default function ActivityForm({ initial = null, onClose }: Props) {
  const { dispatch } = useActivities();

  const [name, setName] = useState(initial?.name ?? "");
  const [startTime, setStartTime] = useState(initial?.startTime ?? "");
  const [endTime, setEndTime] = useState(initial?.endTime ?? "");
  const [duration, setDuration] = useState(initial?.duration ?? 1);
  const [category, setCategory] = useState<Activity["category"]>(initial?.category ?? "study");
  const [description, setDescription] = useState(initial?.description ?? "");

  useEffect(() => {
    setName(initial?.name ?? "");
    setStartTime(initial?.startTime ?? "");
    setEndTime(initial?.endTime ?? "");
    setDuration(initial?.duration ?? 1);
    setCategory(initial?.category ?? "study");
    setDescription(initial?.description ?? "");
  }, [initial]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return alert("Vui lòng nhập tên hoạt động");

    const payload = {
      name,
      startTime,
      endTime,
      duration,
      category,
      description,
    };

    if (initial) {
      dispatch({
        type: "UPDATE",
        payload: {
          ...initial,
          ...payload,
        },
      });
    } else {
      dispatch({
        type: "ADD",
        payload,
      });
    }

    if (onClose) onClose();

    // Reset form
    setName("");
    setStartTime("");
    setEndTime("");
    setDuration(1);
    setCategory("study");
    setDescription("");
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên hoạt động"
        required
      />
      <input
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        type="datetime-local"
        placeholder="Thời gian bắt đầu"
      />
      <input
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        type="datetime-local"
        placeholder="Thời gian kết thúc"
      />
      <input
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        type="number"
        min={0.25}
        step={0.25}
        placeholder="Thời lượng (giờ)"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value as Activity["category"])}>
        <option value="study">Học</option>
        <option value="work">Làm việc</option>
        <option value="relax">Giải trí</option>
        <option value="other">Khác</option>
      </select>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Mô tả"
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">{initial ? "Lưu thay đổi" : "Thêm hoạt động"}</button>
        {onClose && (
          <button type="button" onClick={onClose}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
