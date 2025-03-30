//it is sort of middle person between your request and response
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/summaries(.*)",
  "/upload(.*)"
]); //these routes are protected routes and others are not
export default clerkMiddleware(async(auth,req)=>{
  if(isProtectedRoute(req)){
    await auth.protect(); //if it is a protected route then we're gonna protect it

  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}