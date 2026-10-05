# Bug report 004 - Marketing opt-in is pre-ticked on the reservation form

**App** lightmenu.app
**Date** 2026-10-05
**Environment** Windows 11, Chromium 149 (Playwright)
**Severity** Moderate - no functional impact, but a legal-risk issue
**Status** Open

## Summary
On the reservation form, the checkbox "Email me occasional offers and news from Restaurante El Sueño" is ticked by default, so customers who don't change it are signed up for marketing emails.

## Steps to reproduce
1. Open a private window.
2. Go to https://www.lightmenu.app/reservation/restaurante-el-sueno
3. Look at the checkbox above "Confirm booking".

## Expected
The checkbox is unticked by default. The customer ticks it to opt in.

## Actual
Checked on 2026-10-05 on four restaurants (restaurante-el-sueno, edlala-restaurant, arcelen, vinitus): the box is ticked by default on all four. No link to a privacy policy, terms or unsubscribe information appears on the form. The box can be unticked, but it comes back ticked after a page reload.

## Impact
Customers can be signed up for marketing emails they didn't choose. The pre-ticked box may not meet EU consent rules (GDPR, Recital 32), which could lead to complaints against the restaurants, who are responsible for that consent.

## Suggestion
Add a separate, mandatory checkbox for the terms and conditions.

## Evidence
![checkbox](004-checkbox.png)
