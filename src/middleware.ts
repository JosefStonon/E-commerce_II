 import { authMiddleware } from "@clerk/nextjs";
 
 export default authMiddleware({
   publicRoutes: ['/', '/product(.*)', '/sign-in', '/sign-up', 'api/webhooks/user'],
 
 });
 
 export const config = {
   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

//psql ""

//postgres://default:gCXezMD0AKU7@ep-old-queen-80987926-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb