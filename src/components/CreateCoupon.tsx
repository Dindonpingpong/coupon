import { useState, type FormEvent } from "react";
import { createCoupon, type CreateCouponResponse } from "../api/couponApi";

const CURRENCIES = ["USD", "EUR", "RUB", "GBP", "CNY"];

export default function CreateCoupon() {
  const [orgId, setOrgId] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [validSince, setValidSince] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreateCouponResponse | null>(null);
  const [error, setError] = useState("");

  const titleError = title.length > 6 ? "Максимум 6 символов" : "";
  const amountError =
    amount.length > 4 ? "Максимум 4 символа" : "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (titleError || amountError) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const formatDate = (v: string) =>
        v.replace("T", " ").slice(0, 16) + ":00";
      const res = await createCoupon({
        orgId,
        title,
        amount: Number(amount),
        currency,
        validSince: formatDate(validSince),
        validUntil: formatDate(validUntil),
      });
      setResult(res);
      if (!res.success) {
        setError(res.reason || "Ошибка создания купона");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card">
      <h2>Создать купон</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="orgId">Organization ID</label>
          <input
            id="orgId"
            type="text"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
            placeholder="org-1"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="title">Название</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={6}
            placeholder="До 6 символов"
            required
          />
          {titleError && <span className="field-error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="amount">Сумма</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="До 9999"
            required
          />
          {amountError && <span className="field-error">{amountError}</span>}
        </div>

        <div className="field">
          <label htmlFor="currency">Валюта</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="validSince">Действует с</label>
          <input
            id="validSince"
            type="datetime-local"
            value={validSince}
            onChange={(e) => setValidSince(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="validUntil">Действует до</label>
          <input
            id="validUntil"
            type="datetime-local"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading || !!titleError || !!amountError}>
          {loading ? "Создание..." : "Создать"}
        </button>
      </form>

      {error && <div className="message error">{error}</div>}

      {result && result.success && (
        <div className="message success">
          <h3>Купон создан</h3>
          <table className="result-table">
            <tbody>
              <tr><td>ID</td><td>{result.id}</td></tr>
              <tr><td>Название</td><td>{result.title}</td></tr>
              <tr><td>Сумма</td><td>{result.amount} {result.currency}</td></tr>
              <tr><td>Создан</td><td>{new Date(result.createdAt).toLocaleString()}</td></tr>
              <tr><td>Действует с</td><td>{new Date(result.validSince).toLocaleString()}</td></tr>
              <tr><td>Действует до</td><td>{new Date(result.validUntil).toLocaleString()}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
