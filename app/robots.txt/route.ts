import { NextResponse } from "next/server"

export async function GET() {
  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: https://wave-makers.pl/sitemap.xml
`

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}

