# Console Logs Reference - Demo Mode

When you use the admin panel, here's what you'll see in the browser console (F12):

## ✅ Successful Product Add (Demo Mode)

```javascript
// When you click "Add Product":

[API] POST /api/admin/products
[API] Request failed: 404: Not Found
[DEMO] Adding product to localStorage

// The form clears and product appears in table
// No error alerts shown - works silently!
```

## ✅ Loading Products on Page Load

```javascript
[API] GET /api/admin/products
[API] Request failed: 404: Not Found
[API] getProducts - using DEMO mode
// Products loaded from localStorage
// Shows in table (or empty if first time)
```

## ✅ Editing a Product

```javascript
[API] PUT /api/admin/products/1
[API] Request failed: 404: Not Found
[DEMO] Updating product in localStorage
// Form clears, table updates with new data
```

## ✅ Deleting a Product

```javascript
[API] DELETE /api/admin/products/1
[API] Request failed: 404: Not Found
[DEMO] Deleting product from localStorage
// Confirmation alert shown
// Product removed from table
```

## ✅ Dashboard Loading

```javascript
[API] GET /api/admin/stats
[API] Request failed: 404: Not Found
[API] getStats fallback: 404: Not Found
// Stats card shows: Sales: 0, Orders: 0, Users: 0, Products: 0

[API] GET /api/admin/orders
[API] Request failed: 404: Not Found
[API] getOrders fallback: 404: Not Found
// Orders table shows: "No orders yet"
```

## 🔄 Real Backend Connection (When DEMO_MODE = false)

```javascript
// If backend API is working:

[API] POST /api/admin/products
[API] Success: { id: 5, name: "Product", ... }
// Data saved to server database

// If backend still not ready:
[API] POST /api/admin/products
[API] Request failed: 404: Not Found
[DEMO] Adding product to localStorage
// Falls back to localStorage automatically
```

## 📝 What Different Logs Mean

| Log Prefix                 | Meaning                               |
| -------------------------- | ------------------------------------- |
| `[API]`                    | API call being made                   |
| `[API] Success:`           | Data received from backend            |
| `[API] Request failed:`    | Backend returned error                |
| `[DEMO]`                   | Fell back to localStorage (demo mode) |
| `[API] Non-JSON response:` | Got HTML instead of JSON (404 page)   |
| `[API] JSON parse error:`  | Error parsing response                |

## 🎯 Normal vs Demo Mode Logs

### ❌ Backend Not Ready (Current)

```
[API] POST /api/admin/products
[API] Request failed: 404: Not Found
[DEMO] Adding product to localStorage ← Fallback activated
```

### ✅ Backend Ready (After setup)

```
[API] POST /api/admin/products
[API] Success: { id: 5, name: "Product", ... } ← Saved to database
```

## 🔍 How to View Console Logs

1. Open browser (Chrome, Firefox, Edge)
2. Press `F12` or Right-click → Inspect
3. Click "Console" tab
4. Perform action (add product, refresh page, etc.)
5. See logs appear in real-time

## 💡 What to Look For

When testing:

- ✅ `[API] POST` or `[API] GET` means request being made
- ✅ `[DEMO]` means fallback to localStorage activated
- ✅ No red error messages = everything working
- ✅ `[API] Success:` = backend working (when configured)

## ⚠️ Warning Signs

| Log                        | Meaning                 | Solution                          |
| -------------------------- | ----------------------- | --------------------------------- |
| `[API] Non-JSON response:` | Got HTML error page     | Backend 404 - demo mode active    |
| `[API] JSON parse error:`  | Response not valid JSON | Check backend format              |
| Uncaught Error in console  | Code crash              | Check browser console for details |

## 🚀 Example: Complete Add Product Flow

```javascript
// User fills form and clicks "Add Product"

// Step 1: Validation
// (no console logs if valid)

// Step 2: Try to send to backend
[API] POST /api/admin/products

// Step 3: Backend not available
[API] Request failed: 404: Not Found

// Step 4: Fall back to localStorage
[DEMO] Adding product to localStorage

// Step 5: Success
// Form clears, product appears in table
// User sees green checkmark notification
```

## 📋 Checklist: Expected Logs

When everything is working correctly, you should see:

- [ ] On page load: `[API] GET /api/admin/products`
- [ ] After demo mode: `[DEMO] Adding product to localStorage`
- [ ] On dashboard: `[API] GET /api/admin/stats` and `[API] GET /api/admin/orders`
- [ ] No red error messages
- [ ] Products appear in table
- [ ] Refresh page → products still there

All these = ✅ Everything working perfectly!

## 🎓 Understanding the Flow

```
User Action (Add Product)
    ↓
Form Validation ✅
    ↓
Try Backend API
    ↓
    ├→ Backend responds ✅ → Save to database
    └→ Backend returns 404 → Fall back to localStorage
    ↓
Update UI with new product
    ↓
Clear form, show success
```

If backend ever becomes available, demo mode automatically stops and uses it!

---

**Pro Tip:** Copy these logs and include them in your project documentation to show how error handling works! 📚
