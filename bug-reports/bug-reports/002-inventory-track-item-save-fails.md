# Bug Report 002 — Track Menu Item Save Fails Silently

**App:** lightmenu.app  
**Page:** Inventory  
**Date:** 2026-08-23  
**Severity:** High  
**Status:** Open  

## Summary
Clicking "Save" on the "Track a menu item" modal does nothing. No success message, no error message — the action fails silently.

## Steps to Reproduce
1. Log into lightmenu.app
2. Navigate to the Inventory page
3. Click "Track a menu item"
4. Select a menu item, fill in Unit, Stock, and Reorder at fields
5. Click Save

## Expected Result
The item is saved and a success confirmation is shown.

## Actual Result
Nothing happens. The modal stays open. No feedback is given to the user.

## Console Errors
- `POST 400 Bad Request` to Supabase recipe_links endpoint
- `Could not find the 'created_by' column of 'recipe_links' in the schema cache`

## Impact
High — restaurant owners cannot track inventory. Feature is completely broken with no user feedback explaining why.