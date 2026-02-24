# Shopify Setup Guide

## 1. Create a Shopify Store

1. Go to [shopify.com](https://www.shopify.com) and create an account
2. Choose a plan (Basic is fine to start)
3. Your store domain will look like: `your-store.myshopify.com`

## 2. Create Products

Create the following products in Shopify Admin > Products:

| Product Name | Price | Type |
|---|---|---|
| HSA Days: The Guided Journal | $29.00 | Physical |
| HSA Days: The Keepsake Edition | $49.00 | Physical |
| The Story Edition (eBook) | $9.99 | Digital |
| Support HSA Days - $5 | $5.00 | Digital |
| Support HSA Days - $10 | $10.00 | Digital |
| Support HSA Days - $25 | $25.00 | Digital |

For each product, note the **Variant ID** (found in the URL when editing a variant, or via Shopify API).

## 3. Create a Storefront Access Token

1. Go to Shopify Admin > Settings > Apps and sales channels
2. Click "Develop apps" > "Create an app"
3. Name it "HSA Days Website"
4. Under "Configuration" > "Storefront API", enable:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
5. Install the app
6. Copy the **Storefront access token**

## 4. Set Environment Variables in Vercel

Go to your Vercel project > Settings > Environment Variables and add:

```
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
NEXT_PUBLIC_SHOPIFY_VARIANT_GUIDED_JOURNAL=gid://shopify/ProductVariant/XXXXXXXXXX
NEXT_PUBLIC_SHOPIFY_VARIANT_KEEPSAKE=gid://shopify/ProductVariant/XXXXXXXXXX
NEXT_PUBLIC_SHOPIFY_VARIANT_STORY_EBOOK=gid://shopify/ProductVariant/XXXXXXXXXX
NEXT_PUBLIC_SHOPIFY_VARIANT_SUPPORT_5=gid://shopify/ProductVariant/XXXXXXXXXX
NEXT_PUBLIC_SHOPIFY_VARIANT_SUPPORT_10=gid://shopify/ProductVariant/XXXXXXXXXX
NEXT_PUBLIC_SHOPIFY_VARIANT_SUPPORT_25=gid://shopify/ProductVariant/XXXXXXXXXX
```

Replace `XXXXXXXXXX` with the actual variant IDs from step 2.

## 5. Redeploy

After setting the environment variables, redeploy the site. The buy buttons will automatically activate.

## How It Works

- When env vars are set to `placeholder` or missing, buttons show "Pre-Orders Opening Soon" and scroll to the email signup
- When env vars are real values, buttons create a Shopify checkout and redirect users to complete their purchase
- No code changes needed — just set the env vars and redeploy
