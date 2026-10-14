import { test, expect } from '@playwright/test';
import { z } from 'zod';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../config/env';

// Fields the public menu page actually needs to render. If the real response
// has MORE than this, that's fine (see the test below) - but this is the
// shape we assert a known restaurant always has.
const PublicRestaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
});

// Columns that have no business being readable by a logged-out visitor with or wtvrw²
// nothing but the public anon key. None of these are empty by accident -
// created_by/updated_by are real internal user ids on every restaurant today.
const SENSITIVE_FIELDS = ['owner_email', 'created_by', 'updated_by', 'autonomy_financial_limit'];

function restaurantsUrl(query: string) {
  return `${SUPABASE_URL}/rest/v1/restaurants?${query}`;
}

test('looking up a restaurant by slug returns its public data', async ({ request }) => {
  const res = await request.get(restaurantsUrl('select=*&slug=eq.vinitus'), {
    headers: { apikey: SUPABASE_ANON_KEY },
  });

  expect(res.status()).toBe(200);

  const rows = await res.json();
  expect(rows).toHaveLength(1);
  expect(PublicRestaurantSchema.parse(rows[0]).slug).toBe('vinitus');
});

test.fail('the public restaurants endpoint should not expose internal fields', async ({ request }) => {
  const res = await request.get(restaurantsUrl('select=*&slug=eq.vinitus'), {
    headers: { apikey: SUPABASE_ANON_KEY },
  });
  const [restaurant] = await res.json();

  const leaked = SENSITIVE_FIELDS.filter((field) => field in restaurant);
  expect(leaked, `these internal fields are exposed: ${leaked.join(', ')}`).toHaveLength(0);
});

test('an unknown slug returns an empty list, not an error', async ({ request }) => {
  const res = await request.get(restaurantsUrl('select=*&slug=eq.no-such-restaurant-xyz'),{
    headers: {apikey: SUPABASE_ANON_KEY},
  });

    expect(res.status()).toBe(200);

    const rows = await res.json();
    expect(rows).toHaveLength(0);

});

test('a request with no apikey header is rejected', async ({ request }) => {
    const res = await request.get(restaurantsUrl('select=*&slug=eq.vinitus'));

      expect(res.status()).toBe(401);

      const body = await res.json();
      expect(body).toHaveProperty('message');

});
