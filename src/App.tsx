import { Routes, Route, NavLink } from "react-router-dom";
import CreateCoupon from "./components/CreateCoupon";
import ActivateCoupon from "./components/ActivateCoupon";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-brand">CouponApp</div>
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
          Coupon Manager
        </NavLink>
        <NavLink to="/client" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Клиент
        </NavLink>
      </nav>

      <main className="page">
        <Routes>
          <Route path="/" element={<ManagerPage />} />
          <Route path="/client" element={<ClientPage />} />
        </Routes>
      </main>
    </div>
  );
}

function ManagerPage() {
  return (
    <>
      <header className="page-header">
        <h1>Coupon Manager</h1>
        <p className="page-subtitle">Создание и управление купонами</p>
      </header>
      <CreateCoupon />
    </>
  );
}

function ClientPage() {
  return (
    <>
      <header className="page-header">
        <h1>Клиент</h1>
        <p className="page-subtitle">Активация купонов</p>
      </header>
      <ActivateCoupon />
    </>
  );
}

export default App;
