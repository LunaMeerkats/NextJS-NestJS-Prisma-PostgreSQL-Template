# Frontend – Next.js App

This package contains the React frontend for the template.

See [AGENTS.md](./AGENTS.md) for conventions and workflow tips.

## Environment variables
The app reads values from `.env.*` files based on `NODE_ENV`.

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL for the backend API |

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Do not place secrets in these variables.

The application sends strict security headers, including a Content Security Policy defined in `next.config.ts`.

## Development
```bash
npm install
npm run dev
```

## Testing
```bash
npm test
```

## Production build
```bash
npm run build
npm start
```
