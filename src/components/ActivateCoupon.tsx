import { useState, type FormEvent } from "react";
import { activateCoupon, type ActivateCouponResponse } from "../api/couponApi";

export default function ActivateCoupon() {
  const [userId, setUserId] = useState("");
  const [ip, setIp] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ActivateCouponResponse | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await activateCoupon({
        userId,
        ip,
        data: { title },
      });
      setResult(res);
      if (!res.success) {
        setError(res.error || "Ошибка активации купона");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card">
      <h2>Активировать купон</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="userId">ID пользователя</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="user-123"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="ip">IP-адрес</label>
          <input
            id="ip"
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.1"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="couponTitle">Код купона</label>
          <input
            id="couponTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название купона"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Активация..." : "Активировать"}
        </button>
      </form>

      {error && <div className="message error">{error}</div>}

      {result && result.success && (
        <div className="message success">Купон успешно активирован!</div>
      )}
    </div>
  );
}
