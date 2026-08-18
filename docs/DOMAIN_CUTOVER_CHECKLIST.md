# HILTECH Domain Cutover Checklist

Everything in this document is intentionally limited to the final domain switch. Application, catalog, database, SEO, redirects, legal routes, and deployment readiness are prepared before this step.

## Canonical host

- Production canonical: `https://www.hiltech-eg.com`
- Apex `https://hiltech-eg.com/*` must redirect permanently to the same path on `https://www.hiltech-eg.com/*`.

## Cutover

1. Attach `www.hiltech-eg.com` to the HILTECH Vercel project.
2. Point the required DNS record(s) for `www` to Vercel as instructed by the Vercel domain setup screen.
3. Attach `hiltech-eg.com` to the same Vercel project and point its required DNS record(s) to Vercel.
4. Confirm the application redirect sends apex requests to `www` while preserving the path.
5. Confirm HTTPS certificates are active for both hosts.

## Immediate verification after DNS resolves

- `/` returns 200 on `www` and declares canonical `https://www.hiltech-eg.com`.
- `/robots.txt` references `https://www.hiltech-eg.com/sitemap.xml`.
- `/sitemap.xml` is reachable and contains the 48 English and 48 Arabic product routes plus core/legal routes.
- One priority product page such as the HPE QK735A route returns 200 with Product JSON-LD, canonical, and EN/AR hreflang.
- A legacy Wix product path `/product-page/<slug>` redirects permanently to `/products-partners/<slug>`.
- `/privacy-policy` and `/accessibility-statement` return 200.
- RFQ submission, tracking, and admin login are smoke-tested against the production host.

## Search handoff

After the domain is live on Vercel, submit/confirm `https://www.hiltech-eg.com/sitemap.xml` in Google Search Console and use URL Inspection on the highest-priority SKU pages. Do not change the canonical host back to the apex domain.
