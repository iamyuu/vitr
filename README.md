# vitr

```sh
npx degit iamyuu/vitr
```

## Libraries

- [@tanstack/react-query](https://tanstack.com/query/v4) - getting remote data with ease
- [react-router-dom](https://reactrouter.com) - handling routing

## Available Scripts

- `make setup`: Setup the project.
- `npm run cz`: Run commitizen cli.
- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Build the app to the production mode.
- `npm run preview`: Preview the app in the production mode.
- `npm run lint`: Lint the code.
- `npm run format`: Formitize the code.
- `npm run test`: Run the test.

## Project Structure

```
src
├── assets        # contain all the static files such as images, fonts, etc.
├── components    # shared components used across the entire application
├── constants     # global configuration, env variables, etc
├── features      # feature based modules
├── hooks         # shared hooks used across the entire application
├── libs          # re-exporting different libraries preconfigured for the application
├── providers     # all of the application providers
├── routes        # screen that will show to user
├── stores        # global state stores
├── tests         # test utilities and mock server
├── types         # base types used accross the application
└── utils         # shared utility functions
```
