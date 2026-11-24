import { test, expect } from '@playwright/test';
import { SUPABASE_URL, SUPABASE_ANON_KEY, TEST_EMAIL_B, TEST_PASSWORD_B } from '../../config/env';

async function login(request, email: string, password: string) {
    const res = await request.post(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
        data: { email, password },
    });
    const body = await res.json();
    return body.access_token;
}

test('a user cannot change the price of another owner\'s menu item', async ({ request }) => {
    const res = await request.get(`${SUPABASE_URL}/rest/v1/restaurants?select=*&slug=eq.vinitus`, {
        headers: { apikey: SUPABASE_ANON_KEY },
    });
    expect(res.status()).toBe(200);
    const [restaurant] = await res.json();

    const itemRes = await request.get(`${SUPABASE_URL}/rest/v1/menu_items?select=id,price&restaurant_id=eq.${restaurant.id}`, {
        headers: { apikey: SUPABASE_ANON_KEY },
    });
    expect(itemRes.status()).toBe(200);
    const [item] = await itemRes.json();
    const originalPrice = item.price;

    const tokenB = await login(request, TEST_EMAIL_B, TEST_PASSWORD_B);

    await request.patch(`${SUPABASE_URL}/rest/v1/menu_items?id=eq.${item.id}`, {
        headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${tokenB}`,
            'Content-Type': 'application/json',
        },
        data: { price: 999 },
    });

    // PostgREST can return 204 even when RLS silently blocked the write and
    // 0 rows were touched - the status code alone doesn't prove anything,
    // so re-read the real data to confirm the price was never actually changed.
    const verifyRes = await request.get(`${SUPABASE_URL}/rest/v1/menu_items?select=id,price&id=eq.${item.id}`, {
        headers: { apikey: SUPABASE_ANON_KEY },
    });
    const [verifiedItem] = await verifyRes.json();
    expect(verifiedItem.price).toBe(originalPrice);
});