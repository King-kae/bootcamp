import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    MONGODB_DB: process.env.MONGODB_DB,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_TEST_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_TEST_PAYSTACK_PUBLIC_KEY,
  },
};

export default nextConfig;
