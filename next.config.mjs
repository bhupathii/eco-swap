let userConfig = undefined;
try {
  userConfig = await import("./v0-user-next.config");
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Consider enabling ESLint for production builds after fixing all issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Consider enabling TypeScript checks for production builds after fixing all issues
    ignoreBuildErrors: true,
  },
  images: {
    // For Vercel deployment, you can use their optimized image handling
    // Disabling unoptimized for better performance
    unoptimized: false,
    // Add domains if you're using external image sources
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Useful experimental features for performance
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Add trailing slash configuration if needed
  trailingSlash: false,
  // Optimize for production
  swcMinify: true,
};

mergeConfig(nextConfig, userConfig);

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return;
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

export default nextConfig;
