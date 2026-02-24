import Client from "shopify-buy";

/* ── Product configuration ────────────────────────────── */

export type ProductSlug =
  | "guided-journal"
  | "keepsake-edition"
  | "story-edition-ebook"
  | "support-5"
  | "support-10"
  | "support-25";

type ProductConfig = {
  variantEnvKey: string;
  name: string;
  price: string;
};

const PRODUCTS: Record<ProductSlug, ProductConfig> = {
  "guided-journal": {
    variantEnvKey: "NEXT_PUBLIC_SHOPIFY_VARIANT_GUIDED_JOURNAL",
    name: "HSA Days: The Guided Journal",
    price: "$29",
  },
  "keepsake-edition": {
    variantEnvKey: "NEXT_PUBLIC_SHOPIFY_VARIANT_KEEPSAKE",
    name: "HSA Days: The Keepsake Edition",
    price: "$49",
  },
  "story-edition-ebook": {
    variantEnvKey: "NEXT_PUBLIC_SHOPIFY_VARIANT_STORY_EBOOK",
    name: "The Story Edition (eBook)",
    price: "$9.99",
  },
  "support-5": {
    variantEnvKey: "NEXT_PUBLIC_SHOPIFY_VARIANT_SUPPORT_5",
    name: "Support HSA Days — $5",
    price: "$5",
  },
  "support-10": {
    variantEnvKey: "NEXT_PUBLIC_SHOPIFY_VARIANT_SUPPORT_10",
    name: "Support HSA Days — $10",
    price: "$10",
  },
  "support-25": {
    variantEnvKey: "NEXT_PUBLIC_SHOPIFY_VARIANT_SUPPORT_25",
    name: "Support HSA Days — $25",
    price: "$25",
  },
};

/* ── Helpers ──────────────────────────────────────────── */

function getEnv(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  return (process.env as Record<string, string | undefined>)[key];
}

export function isShopifyConfigured(): boolean {
  const domain = getEnv("NEXT_PUBLIC_SHOPIFY_DOMAIN");
  const token = getEnv("NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN");
  return !!(
    domain &&
    domain !== "placeholder" &&
    token &&
    token !== "placeholder"
  );
}

export function getProduct(slug: ProductSlug): ProductConfig {
  return PRODUCTS[slug];
}

function getVariantId(slug: ProductSlug): string | null {
  const config = PRODUCTS[slug];
  const id = getEnv(config.variantEnvKey);
  if (!id || id === "placeholder") return null;
  return id;
}

/* ── Shopify client singleton ─────────────────────────── */

let clientInstance: ReturnType<typeof Client.buildClient> | null = null;

function getClient() {
  if (clientInstance) return clientInstance;

  const domain = getEnv("NEXT_PUBLIC_SHOPIFY_DOMAIN");
  const token = getEnv("NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN");

  if (!domain || !token) return null;

  clientInstance = Client.buildClient({
    domain,
    storefrontAccessToken: token,
    apiVersion: "2024-01",
  });

  return clientInstance;
}

/* ── Checkout ─────────────────────────────────────────── */

export async function createCheckout(slug: ProductSlug): Promise<void> {
  const client = getClient();
  if (!client) throw new Error("Shopify is not configured");

  const variantId = getVariantId(slug);
  if (!variantId) throw new Error("Product variant not configured");

  const checkout = await client.checkout.create();
  await client.checkout.addLineItems(checkout.id, [
    { variantId, quantity: 1 },
  ]);

  // Redirect to Shopify checkout
  window.location.href = (checkout as unknown as { webUrl: string }).webUrl;
}
