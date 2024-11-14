# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

1. Create a copy of file .env.example /.env
2. You can change database name in /.env. New database will be created automatically.
3. Before starting, you need to run Docker (for example, open Docker Desktop)

```
npm run start
```
Wait until you see 'Server started' message in console. Only then server is ready to work, to be tested and to show docs.
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Testing

After application running (app SHOULD BE RUNNING!) open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Check formatting

```
npm run lint
```

```
npm run format
```
