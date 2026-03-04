const BASE_URL = "https://shop.com/coupons/v1/coupon";

export interface CreateCouponRequest {
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function activateCoupon(
  data: ActivateCouponRequest
): Promise<ActivateCouponResponse> {
  const response = await fetch(`${BASE_URL}/activate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
