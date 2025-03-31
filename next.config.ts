import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint :{
    //this allows production builds to successfully complete
    ignoreDuringBuilds : true
  }
};

export default nextConfig;
