# Stripe Configuration Guide

To enable real payments in Puck Battle Arena: HYPE, you need to create three products in your Stripe Dashboard and generate "Payment Links" for them.

## 1. Create Products

Go to your [Stripe Dashboard > Products](https://dashboard.stripe.com/products) and create the following:

| Product Name | Price | Description |
| :--- | :--- | :--- |
| **Arena Icon Pack - Single** | **$0.50** | Purchase 1 icon pack. Guaranteed 1 icon. Pulls scaled by tier rarity. Includes chance for extra pack. |
| **Arena Icon Pack - 10-Pack** | **$3.00** | Bundle of 10 packs (30 icon pulls). Slight discount per icon. Rarity scale applies. |
| **Unlock All Icons** | **$99.99** | Unlock all 150 icons immediately. Includes all default colors and hidden mystery icons. Bypass pack mechanics. |

## 2. Generate Payment Links

For each product, click "Create Payment Link".
*   You can configure the "After payment" behavior to redirect back to your game URL (e.g., `http://your-game-url.com?payment_success=true`).

## 3. Integrate into Code

Open `src/Store.js` and find the `STRIPE_LINKS` constant at the top of the component. Paste your generated links there:

```javascript
  const STRIPE_LINKS = {
    pack_1: 'https://buy.stripe.com/your_link_1',
    pack_10: 'https://buy.stripe.com/your_link_2',
    unlock_all: 'https://buy.stripe.com/your_link_3'
  };
```

Once updated, clicking "Buy" in the game will redirect players to the secure Stripe checkout page.
