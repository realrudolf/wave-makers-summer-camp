import { type NextRequest, NextResponse } from "next/server"
import { getSecurityHeaders } from "./app/security-headers"

export function middleware(req: NextRequest) {
  // Klonuj nagłówki odpowiedzi
  const response = NextResponse.next()

  // Dodaj nagłówki bezpieczeństwa
  const securityHeaders = getSecurityHeaders()
  securityHeaders.forEach(({ key, value }) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Pasuje do wszystkich ścieżek z wyjątkiem:
     * - Ścieżek API (api/*)
     * - Plików statycznych (_next/static/*, favicon.ico, itp.)
     * - Danych pobieranych przez klienta (_next/data/*)
     * - Obrazków (/images/*)
     */
    "/((?!api|_next/static|_next/image|_next/data|images|favicon.ico).*)",
  ],
}

