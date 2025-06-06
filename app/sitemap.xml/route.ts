import { NextResponse } from "next/server"

export async function GET() {
  // Aktualna data w formacie ISO
  const date = new Date().toISOString()

  // Generowanie sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 <url>
   <loc>https://wave-makers.pl</loc>
   <lastmod>${date}</lastmod>
   <changefreq>weekly</changefreq>
   <priority>1.0</priority>
 </url>
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

