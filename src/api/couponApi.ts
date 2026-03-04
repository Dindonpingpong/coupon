const BASE_URL = import.meta.env.DEV
  ? "/api/coupons/v1/coupon"
  : "https://coupon-api-three.vercel.app/coupons/v1/coupon";

const HEADERS = {
  "Content-Type": "application/json",
  "x-vercel-protection-bypass": "TEST",
};

export interface CreateCouponRequest {
  orgId: string;
  title: string;
  amount: number;
  currency: string;
  validSince: string;
  validUntil: string;
}

export interface CreateCouponResponse {
  success: boolean;
  reason?: string;
  id: number;
  title: string;
  amount: number;
  currency: string;
  createdAt: string;
  validSince: string;
  validUntil: string;
}

export interface ActivateCouponRequest {
  orgId: string;
  userId: string;
  ip: string;
  data: {
    title: string;
  };
}

export interface ActivateCouponResponse {
  success: boolean;
  error?: string;
}

export async function createCoupon(
  data: CreateCouponRequest
): Promise<CreateCouponResponse> {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function activateCoupon(
  data: ActivateCouponRequest
): Promise<ActivateCouponResponse> {
  const response = await fetch(`${BASE_URL}/activate`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
  return response.json();
}
