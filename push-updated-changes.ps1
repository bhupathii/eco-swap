# PowerShell script to push changes to GitHub

Write-Host "Adding changes to git..."
git add app/page.tsx

Write-Host "Committing changes..."
git commit -m "Fix video background loading issues with improved error handling"

Write-Host "Pushing to GitHub..."
git push origin main

Write-Host "Done! Your changes have been pushed to GitHub."
Write-Host "Vercel should automatically rebuild your project." 