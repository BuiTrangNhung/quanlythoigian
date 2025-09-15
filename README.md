🚀 Project Setup & Usage
✍️

bash
npm install  
npm start
🔗 Deployed Web URL or APK file
✍️ (http://localhost:5173/)

🎥 Demo Video
✍️https://youtube.com/shorts/HvqxSWh9y5A?feature=share

💻 Project Introduction
a. Overview
✍️ Expense & Time Balance + Reminder is a productivity app designed to help users—especially students—track their daily activities along with time spent and expenses incurred. Beyond basic logging, the app provides smart reminders to prevent missed deadlines and overspending.

b. Key Features & Function Manual
✍️

Full CRUD operations: Add, view, edit, and delete activities.

Persistent storage: Data is saved using localStorage (upgradeable to Firebase or SQLite).

Three distinct views:

List View: Displays all activities with status (upcoming / overdue).

Calendar View: Weekly calendar layout to visualize tasks.

Stats View: Charts showing time distribution (study/work/leisure) and total expenses.

Time-sensitive logic:

Activities with deadlines < 24 hours are highlighted in red/orange.

Overdue activities are marked accordingly.

Supports 20+ items: Includes scroll, search, and filter functionality.

Smart reminders:

Deadline Reminder: Alerts 30 minutes or 1 day before a deadline.

Expense Limit Reminder: Users can set a weekly spending limit (e.g., 500k VND). If exceeded, a warning is triggered.

c. Unique Features (What’s special about this app?)
✍️

Combines time management and financial awareness in one tool.

Helps users avoid late tasks and overspending with timely alerts.

Simple logic using Date.now() and sum comparisons keeps the app lightweight yet effective.

d. Technology Stack and Implementation Methods
✍️

Frontend: ReactJS + TailwindCSS

State Management: React Context API

Storage: localStorage (future upgrade to Firebase)

Charts: Chart.js for visualizing time and expense data

Reminders: Implemented using JavaScript timers and date comparisons

e. Service Architecture & Database structure (when used)
✍️

Data is stored as JSON objects in localStorage.

Each activity includes:

json
{
  "id": "uuid",
  "title": "Activity name",
  "datetime": "Scheduled date/time",
  "duration": "Hours spent",
  "cost": "Expense amount",
  "status": "upcoming / overdue"
}
🧠 Reflection
a. If you had more time, what would you expand?
✍️

Integrate Firebase for cloud sync across devices.

Add activity categories and tags for better organization.

Allow users to customize themes and notification settings.

b. If you integrate AI APIs more for your app, what would you do?
✍️

Use AI to predict spending trends based on past data.

Suggest optimized schedules based on user habits.

Analyze which activities consume excessive time or money and offer recommendations.

✅ Checklist
✔️ Code runs without errors ✔️ All required features implemented (add/edit/delete/complete tasks) ✔️ All ✍️ sections are filled
