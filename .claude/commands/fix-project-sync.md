Audit and fix the known project data duplication issue.

The portfolio has project data duplicated in two files. This command checks they're in sync.

Steps:

1. Read `projectsByCategory` in `components/projects-section.tsx` (homepage featured projects).
2. Read `projectsByCategory` in `app/projects/page.tsx` (full gallery).
3. Compare and report:
   - Projects in gallery but not homepage (OK — homepage may show a subset)
   - Projects on homepage but NOT in gallery (BUG — gallery should be the superset)
   - Mismatched titles, descriptions, GitHub URLs, or tech stacks (BUG)
   - Missing `link` fields in gallery version (BUG)
4. Fix any bugs found. The gallery (`app/projects/page.tsx`) is the source of truth for shared fields.
5. Verify every project ID in the gallery has a corresponding page at `app/projects/{id}/page.tsx`. Report any missing pages.
