# Acorny Help Center

Source for the public Acorny documentation site at <https://docs.acorny.io/>.

## Development

Install dependencies:

```bash
pnpm install
```

Run the local docs server:

```bash
pnpm dev
```

Validate the site:

```bash
pnpm lint
pnpm test
pnpm build
```

## Deployment

The site is an Astro + Starlight project. Vercel should use:

- Build command: `pnpm build`
- Output directory: `dist`

## License

No open-source license has been granted yet. All rights reserved unless a license is added to this repository.
