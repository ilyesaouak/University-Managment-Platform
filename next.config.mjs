/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
    strictNullChecks: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // React Compiler support (enable when ready)
    // reactCompiler: true,
  },
}

export default nextConfig
