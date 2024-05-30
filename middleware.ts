import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/',
    '/meeting(.*)',
    '/previous',
    '/recording',
    '/upcoming',
    '/personal-room'
    
  ]);

export default clerkMiddleware((auth,req)=>{
    if(isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};