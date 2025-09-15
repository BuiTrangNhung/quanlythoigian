import { useEffect } from "react";
import { hoursUntil } from "../utils/time";
import { Activity } from "../context/ActivityProvider";

export function useReminders(activities: Activity[]) {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    activities.forEach((a) => {
      if (!a.date || a.completed) return;
      const hours = hoursUntil(a.date);
      if (hours <= 1 && hours > 0) {
        new Notification("Sắp đến hạn!", {
          body: `${a.name} còn ${Math.round(hours * 10) / 10} giờ`,
        });
      }
    });
  }, [activities]);
}
