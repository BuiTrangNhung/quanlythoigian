import { useState } from "react";
import "./App.css";
import ListView from "./views/ListView";
import CalendarView from "./views/CalendarView";
import StatsView from "./views/StatsView";

function App() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Expense & Time Balance + Reminder</h1>
        <p className="brand-slogan">"Thời gian hợp lý - Chi tiêu hợp tình"</p>
      </header>

      {/* Tabs */}
      <nav className="app-tabs">
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          List
        </button>
        <button
          className={activeTab === "calendar" ? "active" : ""}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </button>
        <button
          className={activeTab === "stats" ? "active" : ""}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </button>
      </nav>

      {/* Content */}
      <main className="app-content">
        {activeTab === "list" && <ListView />}
        {activeTab === "calendar" && <CalendarView />}
        {activeTab === "stats" && <StatsView />}
      </main>
    </div>
  );
}

export default App;
