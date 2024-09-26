export { auth as middleware } from "@/lib/auth/AuthOption"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}