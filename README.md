# EV Battery Swap & Rental System

A modern web application for managing electric vehicle battery swapping and rental services.

## Features

- **User Authentication**: Secure login and registration system
- **Battery Swap Management**: Schedule and manage battery swaps
- **Rental Services**: Rent batteries for different durations
- **Station Locator**: Find nearby battery swap stations
- **Payment Integration**: Secure payment processing
- **User Dashboard**: Track usage, payments, and history
- **Battery Health Monitoring**: Advanced system to track and analyze battery performance

## Battery Health Monitoring System

Our state-of-the-art battery health monitoring system provides comprehensive insights into battery performance and longevity:

### Key Features

- **Real-time Health Metrics**: Monitor battery health percentage, charge cycles, and efficiency scores
- **Performance Visualization**: Interactive charts for temperature, voltage, and health trends
- **Charge Cycle Tracking**: Track the number of charge cycles against maximum rated cycles
- **Predictive Analytics**: AI-powered predictions for battery end-of-life dates
- **Swap History**: Detailed records of battery swap events and conditions

### Battery Fleet Overview

The system manages various battery models with different characteristics:

| Model              | Capacity | Max Cycles | Typical Use Case                             |
| ------------------ | -------- | ---------- | -------------------------------------------- |
| EcoSwap Pro 5000   | 5000 Wh  | 1000       | Standard commuter vehicles                   |
| EcoSwap Ultra 7500 | 7500 Wh  | 1200       | Mid-range vehicles, small delivery vans      |
| EcoSwap Max 10000  | 10000 Wh | 1500       | Long-range vehicles, commercial applications |

Each battery in the system has a unique profile with individual performance metrics, allowing for precise monitoring and management of the entire battery fleet.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env.local` file with the required environment variables (see section below)
4. Download a demo video file for the landing page (see `public/videos/README.txt`)
5. Run the development server with `npm run dev`
6. Access the application at http://localhost:3000

## Environment Variables

This application requires the following environment variables:

```
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/ev-battery-swap-rental
```

## Deployment to Vercel

### Prerequisites

- A Vercel account
- A MongoDB database (Atlas recommended for production)
- Google OAuth credentials

### Deployment Steps

1. **Prepare Video Assets**

   - Download an EV bike video and place it in `public/videos/ev-bike-video.mp4`
   - See `public/videos/README.txt` for detailed instructions

2. **Setup Environment Variables**

   - In the Vercel dashboard, add the following environment variables:
     - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
     - `NEXTAUTH_SECRET`: A strong secret key
     - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
     - `MONGODB_URI`: Your MongoDB connection string

3. **Deploy to Vercel**

   ```bash
   # Install Vercel CLI if you don't have it
   npm install -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel
   ```

4. **Alternative: GitHub Integration**
   - Connect your GitHub repository to Vercel
   - Configure the same environment variables in the Vercel project settings
   - Vercel will automatically deploy when you push to the main branch

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI
- MongoDB
- NextAuth.js
- Chart.js for data visualization

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide Icons](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Map integration using [Leaflet](https://leafletjs.com/)
