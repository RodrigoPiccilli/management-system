// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isProtectedRoute = req.nextUrl.pathname.startsWith("/nvr") ||
        req.nextUrl.pathname.startsWith("/homeowners") ||
        req.nextUrl.pathname.startsWith("/receivables");

    if (isProtectedRoute && !user) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = "/login";
        redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    return res;
}

export const config = {
    matcher: ["/nvr/:path*", "/homeowners/:path*", "/receivables/:path*"],
};

