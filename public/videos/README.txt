EV Bike Video Instructions

IMPORTANT FOR PRODUCTION DEPLOYMENT:
Before deploying to Vercel or any production environment, you MUST add a real video file!

1. Download an EV bike video (MP4 format recommended) from a stock video site or your own collection.
2. Rename the video file to "ev-bike-video.mp4".
3. Place the video file in this directory (public/videos/).
4. The video should be high quality but optimized for web (compressed to a reasonable file size, ideally <5MB).
5. Ideal content: Electric bikes in motion, battery swapping, or sustainable transportation themes.
6. Recommended duration: 20-30 seconds (can be looped).
7. Ensure the video has no audio or has appropriate rights for background use.

Suggested sources for royalty-free stock videos:
- Pexels (https://www.pexels.com/search/videos/electric%20bike/)
- Pixabay (https://pixabay.com/videos/search/electric%20bike/)
- Unsplash (https://unsplash.com/s/videos/electric-bike)

After adding the video, restart the development server with:
npm run dev 

For production deployment on Vercel:
1. Make sure you have added the video file before deploying
2. Ensure all environment variables are set in the Vercel dashboard
3. Run a local build test with: npm run build 