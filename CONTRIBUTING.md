# Contributing to ClipCash

Thanks for contributing to ClipCash. This guide covers local setup, development conventions, testing, and pull requests.

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm
- Git

## Local setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/Johnpii1/clips-frontend.git
cd clips-frontend
npm install
```

Create your local environment file:

```bash
cp .env.example .env.local
```

Then start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Use `.env.example` as the source of truth for configuration. Never commit `.env.local`, API keys, private keys, OAuth secrets, or other credentials.

## Testing and quality

Run the relevant checks before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

For end-to-end tests:

```bash
npm run test:e2e
```

For UI component work:

```bash
npm run storybook
```

## Code standards and security

- Follow the existing TypeScript, Next.js, and Tailwind conventions.
- Sanitize user-controlled strings before rendering them in the UI.
- Do not use `dangerouslySetInnerHTML` without explicit sanitization.
- Keep secrets out of source control.
- Use the existing security utilities and project documentation for security-sensitive changes.
- Keep component demos in Storybook rather than public application routes.

## Pull requests

1. Create a focused feature or fix branch.
2. Make the smallest coherent change needed.
3. Add or update tests when appropriate.
4. Run lint, type checks, tests, and a production build.
5. Write a clear commit message and pull request description.
6. Include screenshots for meaningful UI changes.

Recommended branch names:

- `feature/<short-description>`
- `fix/<short-description>`
- `hotfix/<short-description>`

Recommended commit prefixes:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `refactor:` for refactoring
- `chore:` for maintenance

## Changesets

When a change requires a release note or version bump, create a Changeset with:

```bash
npm run changeset
```

Documentation-only and internal changes can use an empty changeset when appropriate.

## Attribution and project history

ClipCash preserves the existing Git history and contributor attribution. Contributions from previous authors remain credited; project branding and documentation may evolve as the project is maintained.

## Questions

Open an issue with a clear description, reproduction steps, and relevant logs or screenshots when requesting help or reporting a problem.
