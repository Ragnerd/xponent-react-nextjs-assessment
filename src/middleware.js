import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "../routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  // Auth pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // Protect non-public routes
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;

    return Response.redirect(
      new URL(
        `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
        nextUrl
      )
    );
  }

  const email = session?.user?.email;
  const role = session?.user?.role;

  const isAdmin = email === "admin@example.com";
  const isCandidate = role === "candidate";

  // Admin-only dashboard

  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!isAdmin) {
      return Response.redirect(new URL("/candidate", nextUrl));
    }
    return;
  }

  // Candidate should never see dashboard

  if (isCandidate && nextUrl.pathname === "/dashboard") {
    return Response.redirect(new URL("/candidate", nextUrl));
  }

  // Admin should NEVER access /candidate
  if (isAdmin && nextUrl.pathname.startsWith("/candidate")) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
