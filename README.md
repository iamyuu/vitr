# vitr

An awesome app.

```sh
npx degit iamyuu/vitr
```

## 🔧 Getting Started

#### Prerequisites

- Node v22.8.0
- pNpm v9.10.0

or, just use [fnm](https://fnm.vercel.app/) and enable [corepack](https://nodejs.org/api/corepack.html), so it will automaticly set up for you.

#### Setup

You can run the below script to setup the project on your local device:

- clone this repo
- run `pnpm run setup`

#### Editor

Nothing special in this section, but for **VSCode** (or Cursor) users, but to make lfe easier you can install our recommended extension by typing `@recommended` at section extensions on primary sidebar.

## ️👔 Project Standards

#### Biome

Biome serves as a linting tool for JavaScript, helping developers in maintaining code quality and adhering to coding standards. Biome helps identify and prevent common errors, ensuring code correctness and promoting consistency throughout the codebase. This approach not only helps in catching mistakes early but also enforces uniformity in coding practices, thereby enhancing the overall quality and readability of the code.

#### TypeScript

Biome is effective for detecting language-related bugs in JavaScript. However, due to JavaScript's dynamic nature, Biome may not catch all runtime data issues, especially in complex projects. To address this, TypeScript is recommended. TypeScript is valuable for identifying issues during large refactoring processes that may go unnoticed. When refactoring, prioritize updating type declarations first, then resolving TypeScript errors throughout the project. It's important to note that while TypeScript enhances development confidence, but it does not prevent runtime failures.

#### Lefthook

We'll use Lefthook for implementing and executing git hooks. By utilizing Lefthook to run code validations before each commit, we can ensure that your code maintains high standards and that no faulty commits are pushed to the repository. Lefthook enables you to perform various tasks linting, code formatting, and type checking before allowing code pushes.

#### Absolute imports

We use absolute import (`~/path/file`) to make it easier to move files around and avoid messy import paths (`../../sevice`). Wherever you move the file, all the imports will remain intact. That means that anything in the src folder can be accessed via `~`, e.g. some file that lives in `src/utils/function` can be accessed using `~/utils/function` instead of `../../../utils/function`.

We also configured `@poplix/ui` to resolve to a folder in `src/components/ui`, this will help us in the future if we have a proper design system that will be used by the whole team. Another thing is we configure `~icons/pop` to resolve local icons on `src/assets/icons`, this is to keep us consistent in importing icons.

#### File naming conventions

We enforce to use `kebab-case` for file naming conventions and folder naming conventions. This can help to keep our codebase consistent and easier to navigate.

We enforce adding a suffix (e.g. `file-name.component`, `file-name.service`, `file-name.type`, etc) to each file in the `features` folder to make it easier when opening many files simultaneously.

## 👟 Script

In the project directory, you can run:

- `pnpm run setup`: Setup local development environment.
- `pnpm run dev`: Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.
- `pnpm run build`: Builds the app for production to the `dist` folder.
- `pnpm run preview`: Open http://localhost:4173 to view it in the browser.
- `pnpm run lint`: Runs linting and formatting the code.
- `pnpm run typecheck`: Check type checking.
- `pnpm run test`: Launches the test runner in the interactive watch mode.
- `pnpm run test:ui`: Launches the test runner with interactive ui.
- `pnpm run test:ci`: Runs test runner only once (for ci environment).
- `pnpm run test:report`: Show coverage report for unit and integration test.
- `pnpm run test:e2e`: Runs end-to-end test runner. Used for smoke test.
- `pnpm run test:e2e:report`: Show end-to-end smoke test test result.

## ⚙️ Libraries

###### 🛠️ Core

- [Vite](https://vitejs.dev/) — Module bundler.
- [React](https://react.dev/) — Library for create user interface.

###### 💅 UI Library

- [Tailwind CSS](https://tailwindcss.com/) — Utility CSS framework.
- [shadcn/ui](https://ui.shadcn.com/) — Collection of re-usable components.
- [Phosphor](https://icones.js.org/collection/ph) — Icon pack.

###### 📊 Data Visualization

- [Recharts](https://recharts.org/) — Chart library.

###### 📍 Router

- [TanStack Router](https://tanstack.com/router/) — A type-safe router.

###### 📡 Remote Data

- [ky](https://github.com/sindresorhus/ky/) — Http client.

###### 🕹️ State Management

- [TanStack Query](https://tanstack.com/query/) — Server state management.
- [XState Store](https://stately.ai/docs/xstate-store/) — Client state management.
- [React Hook Form](https://react-hook-form.com/) — Form state management.

###### 🧪 Testing

- [TypeScript](https://www.typescriptlang.org/) — Static type checker.
- [Vitest](https://vitest.dev/) — Unit and integration test.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — avoid implementation details.
- [Mock Service Worker](https://mswjs.io/) — Mock http request.
- [Playwright](https://playwright.dev/) — End-to-end test.

###### 💻️ Monitoring

- [Sentry](https://sentry.io/) — Error monitoring.

###### 💿 Additional

- [Zod](https://zod.dev/) — Schema validation with static type inference.
- [Biome](https://biomejs.dev/) — Statically analyzes and code formatter.

## 🗄️ Project Structure

Most of the code lives in the `src` folder and looks something like this:

```shell
src
├── assets                  # static files e.g. icons, etc
├── components              # shared component across domain e.g. ui, etc
├── constants               # read-only constant variable e.g. env, etc
├── features
│   └── {domain}
│       ├── components      # component for specific feature
│       ├── schemas         # schema validation for specific feature
│       ├── screens         # screen that will import on route
│       ├── stores          # client side store for specific feature
│       ├── services        # interaction with an external source
│       └── types           # define interface for specific feature
├── generated               # generated files e.g. route
├── hooks                   # shared React custom hooks used across domain
├── providers               # all of the application providers
├── routes                  # screen that will show the user a specific path
├── tests                   # utility test, mock server, etc
├── types                   # shared interface, utility interface, reset types
└── utils                   # shared reuseable functions e.g. http client, etc
```

For easy scalability and maintenance, organize most of the code within the features folder. Each feature folder should contain code specific to that feature, keeping things neatly separated.

## 📍 (Flat) Route Convention

We're using file-based routing, to make sure you understand it you can see the example below:

| Filename                   | Route Path              | Component Output                  |
| -------------------------- | ----------------------- | --------------------------------- |
| __root.tsx                 |                         | `<Root>`                          |
| index.tsx                  | / (exact)               | `<Root><RootIndex>`               |
| about.tsx                  | /about                  | `<Root><About>`                   |
| posts.tsx                  | /posts                  | `<Root><Posts>`                   |
| posts.index.tsx            | /posts (exact)          | `<Root><Posts><PostsIndex>`       |
| posts.$postId.tsx          | /posts/$postId          | `<Root><Posts><Post>`             |
| posts_.$postId.edit.tsx    | /posts/$postId/edit     | `<Root><EditPost>`                |
| settings.tsx               | /settings               | `<Root><Settings>`                |
| settings.profile.tsx       | /settings/profile       | `<Root><Settings><Profile>`       |
| settings.notifications.tsx | /settings/notifications | `<Root><Settings><Notifications>` |
| _layout.tsx                |                         | `<Root><Layout>`                  |
| _layout.layout-a.tsx       | /layout-a               | `<Root><Layout><LayoutA>`         |
| _layout.layout-b.tsx       | /layout-b               | `<Root><Layout><LayoutB>`         |
| files.$.tsx                | /files/$                | `<Root><Files>`                   |

#### File Naming Conventions

- `.` Separator: Routes can use the . character to denote a nested route.
- `$` Token: Routes segments with the `$` token are parameterized and will extract the value from the URL pathname as a route `param`.
- `_` Prefix: Routes segments with the `_` prefix are considered layout-routes and will not be used when matching its child routes against the URL pathname.
- `_` Suffix: Routes segments with the `_` suffix exclude the route from being nested under any parent routes.
- `(folder)` folder name pattern: A folder that matches this pattern is treated as a **route group** which prevents this folder to be included in the route's URL path.
