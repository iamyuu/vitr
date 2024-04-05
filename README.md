# vitr

```sh
npx degit iamyuu/vitr
```

## Libraries

- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [TanStack Router](https://tanstack.com/router/v1) - Client side routing
- [TanStack Query](https://tanstack.com/query/v4) - Asynchronous state management
- [ky](https://github.com/sindresorhus/ky) - HTTP client
- [react-hook-form](https://react-hook-form.com) - Form state management
- [Zod](https://zod.dev) - Validation with static type inference

## Available Scripts

- `pnpm run dev`: Runs the app in the development mode.
- `pnpm run build`: Build the app to the production mode.
- `pnpm run preview`: Preview the app in the production mode.
- `pnpm run lint`: Check code quality
- `pnpm run type-check`: Check type errors

## Project Structure

```
app
├── assets                   # static assets, fonts, etc
├── components               # shared components used across the entire application
├── constants                # global configuration, env variables, etc
├── features                 # feature based modules
│   └── {awesome-features}
│       ├── components       # components scoped to a specific feature
│       ├── schemas          # zod schema for a specific feature
│       ├── services         # exported API request declarations and api hooks related to a specific feature
│       ├── stores           # state stores for a specific feature
│       └── types            # typescript types for TS specific feature
├── generated                # generated files
├── hooks                    # shared hooks used across the entire application
├── libs                     # configuration for external libraries
├── providers                # all of the application providers
├── routes                   # screen that will show to user
├── styles                   # global styling and theme configuration
├── types                    # base types used accross the application
└── utils                    # shared utility functions
```
