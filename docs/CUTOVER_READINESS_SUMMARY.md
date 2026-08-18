# HILTECH Cutover Readiness

Prepared before domain cutover:

- Current 48-product Wix catalog mirrored as the application fallback catalog and synchronized into Supabase as the only active product set.
- Legacy product rows retained as archived records, not exposed as active catalog items.
- Product detail pages use Supabase at runtime with static fallback protection.
- English and Arabic product metadata include canonical URLs, hreflang, social metadata, and Product JSON-LD.
- Sitemap includes stable product routes without depending on a live database call during build.
- Legacy Wix product and utility paths have migration redirects to the new product/RFQ flows.
- Canonical host is `www.hiltech-eg.com`; future apex requests are configured to redirect to `www` while preserving paths.
- Privacy Policy and Accessibility Statement routes are preserved and linked from the footer.
- Unverified marketing metrics were replaced with operational capabilities and workflow proof.
- Supabase RLS is enabled on sensitive public tables; direct anon/authenticated table grants are revoked; trigger function search paths and admin audit FK indexing were hardened.
- Existing Supabase Auth admin account remains intact.

No DNS/domain changes are part of this readiness branch. The remaining launch action is the domain cutover documented in `docs/DOMAIN_CUTOVER_CHECKLIST.md`.
