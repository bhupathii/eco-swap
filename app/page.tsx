"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Battery, Bike, ChevronRight, Zap, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const { user, signIn, isLoading } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    // Ensure video plays automatically when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error)
        setVideoError(true)
      })
    }

    // Check if the video is empty (0 bytes) or has loading issues
    const checkVideo = setTimeout(() => {
      if (videoRef.current) {
        console.log("Video network state:", videoRef.current.networkState)
        console.log("Video ready state:", videoRef.current.readyState)
        console.log("Video source:", videoRef.current.currentSrc)
        
        if (videoRef.current.networkState === 3 || // NETWORK_NO_SOURCE
            videoRef.current.readyState === 0) {   // HAVE_NOTHING
          console.error("Video failed to load")
          setVideoError(true)
        }
      }
    }, 2000)

    return () => clearTimeout(checkVideo)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            {videoError ? (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center">
                <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
                <p className="text-amber-500 text-center max-w-md px-4">
                  Video file is missing or empty. Please add a video file as instructed in the README.txt before deployment.
                </p>
              </div>
            ) : (
              <video 
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onError={(e) => {
                  console.error("Video error event:", e);
                  setVideoError(true);
                }}
              >
                <source src="/videos/ev-bike-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {/* Overlay to ensure text is readable */}
            <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-20">
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
              <div className="flex flex-col justify-center space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                    Sustainable Mobility for a Greener Future
                  </h1>
                  <p className="text-muted-foreground md:text-xl mx-auto">
                    Swap batteries or rent electric bikes with ease. Our network of stations makes sustainable
                    transportation accessible to everyone.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                  {user ? (
                    <Button asChild variant="gradient" size="lg">
                      <Link href="/select-service">
                        Get Started
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button 
                      variant="googleSignIn" 
                      size="lg" 
                      onClick={() => {
                        console.log("Sign in button clicked");
                        try {
                          signIn("google");
                          console.log("Sign in function called successfully");
                        } catch (error) {
                          console.error("Error calling sign in function:", error);
                        }
                      }} 
                      disabled={isLoading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-white">
                        <path fill="currentColor" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                        <path fill="currentColor" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                        <path fill="currentColor" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                        <path fill="currentColor" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
                      </svg>
                      <span className="font-medium">Sign in with Google</span>
                    </Button>
                  )}
                  <Button asChild variant="outline" size="lg">
                    <Link href="#services">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Choose between battery swapping for your electric vehicle or renting an e-bike for your journey.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Battery Swap Card */}
              <div className="gradient-card rounded-xl p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Battery className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Battery Swapping</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Quickly swap your depleted EV battery for a fully charged one at any of our convenient locations. No
                  waiting for a charge.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Instant power, no charging wait</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Multiple warehouse locations</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Secure PIN-based collection</span>
                  </li>
                </ul>
                <Button asChild variant="gradient" className="mt-auto">
                  <Link href={user ? "/battery-swap" : "/"}>Find Battery Stations</Link>
                </Button>
              </div>

              {/* Bike Rental Card */}
              <div className="gradient-card rounded-xl p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Bike className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Bike Rental</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Rent an electric bike for your commute or leisure ride. Pick up and drop off at any of our charging
                  stations.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Variety of e-bike models</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Hourly rental options</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Convenient pickup locations</span>
                  </li>
                </ul>
                <Button asChild variant="gradient" className="mt-auto">
                  <Link href={user ? "/bike-rental" : "/"}>Rent a Bike</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-24 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Simple steps to get you moving with sustainable transportation
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Step 1 */}
              <div className="bg-card/50 rounded-xl p-6 border border-border/50 relative">
                <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Sign Up</h3>
                <p className="text-muted-foreground">
                  Create an account with your Google credentials to access our services.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-card/50 rounded-xl p-6 border border-border/50 relative">
                <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Choose Service</h3>
                <p className="text-muted-foreground">
                  Select whether you need a battery swap or want to rent an e-bike.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-card/50 rounded-xl p-6 border border-border/50 relative">
                <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Pay & Go</h3>
                <p className="text-muted-foreground">
                  Make a payment and receive your PIN or booking confirmation to get started.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Features Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Exciting Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Discover all the ways to enhance your sustainable mobility experience
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              {/* Battery Health Card */}
              <div className="gradient-card rounded-xl p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Battery className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Battery Health Monitoring</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Our innovative battery health monitoring system provides real-time insights into your
                  battery's performance, health status, and charge cycles. Track degradation over
                  time, predict battery lifespan, and optimize your usage patterns for maximum
                  efficiency and longevity.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Real-time health metrics</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Charge cycle tracking</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Predictive lifespan analysis</span>
                  </li>
                </ul>
                <Button asChild variant="gradient" className="mt-auto">
                  <Link href={user ? "/battery-health" : "/"}>Monitor Your Battery</Link>
                </Button>
              </div>

              {/* Dashboard Feature */}
              <div className="gradient-card rounded-xl p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M5 22h14"></path>
                    <path d="M5 2h14"></path>
                    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
                    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Personal Dashboard</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Track your usage history, manage saved locations, and view your environmental impact with our intuitive dashboard.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary mr-2"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Activity tracking</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary mr-2"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Saved locations</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary mr-2"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">CO₂ savings tracker</span>
                  </li>
                </ul>
                <Button asChild variant="gradient" className="mt-auto">
                  <Link href={user ? "/dashboard" : "/"}>View Dashboard</Link>
                </Button>
              </div>

              {/* Rewards Feature */}
              <div className="gradient-card rounded-xl p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="8" r="6"></circle>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Loyalty Rewards</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Earn points with every swap and rental. Redeem for free services, discounts, and exclusive perks as you climb the membership tiers.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary mr-2"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Points for every service</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary mr-2"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Membership tiers</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary mr-2"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Exclusive rewards</span>
                  </li>
                </ul>
                <Button asChild variant="gradient" className="mt-auto">
                  <Link href={user ? "/rewards" : "/"}>Explore Rewards</Link>
                </Button>
              </div>

              {/* Community Feature */}
              <div className="gradient-card rounded-xl p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Community Hub</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Connect with other eco-conscious users, share experiences, join events, and compete on the leaderboard for sustainability achievements.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary mr-2"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Social feed</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary mr-2"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Community events</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary mr-2"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Sustainability leaderboard</span>
                  </li>
                </ul>
                <Button asChild variant="gradient" className="mt-auto">
                  <Link href={user ? "/community" : "/"}>Join Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="rounded-xl overflow-hidden gradient-bg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Ready to get started?</h2>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of users who are already enjoying sustainable mobility with EcoSwap.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {user ? (
                      <Button asChild variant="gradient" size="lg">
                        <Link href="/select-service">
                          Get Started
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        variant="googleSignIn" 
                        size="lg" 
                        onClick={() => {
                          console.log("Sign in button clicked");
                          try {
                            signIn("google");
                            console.log("Sign in function called successfully");
                          } catch (error) {
                            console.error("Error calling sign in function:", error);
                          }
                        }} 
                        disabled={isLoading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-white">
                          <path fill="currentColor" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                          <path fill="currentColor" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                          <path fill="currentColor" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                          <path fill="currentColor" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
                        </svg>
                        <span className="font-medium">Sign in with Google</span>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="relative h-64 md:h-auto overflow-hidden rounded-r-xl">
                  {/* Using the EV bike SVG image */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Image
                      src="/images/ev-bike.svg"
                      fill
                      alt="Electric bike"
                      className="object-contain hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

