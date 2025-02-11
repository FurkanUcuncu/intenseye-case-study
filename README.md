# React + TypeScript + Vite

## How To Run The Project
Project runs in local computer. Run below scripts to start project in local computer.

1. ```npm install```
2. ```npm run dev```

or

1. ```yarn install```
2. ```yarn dev```

## Scripts
| Script        | Details                                                                                                  |
|---------------|----------------------------------------------------------------------------------------------------------|
| dev           | Starting the project in dev environment                                                                  |
| build         | Building the project in production environment                                                           |
| lint          | Running javascript linter to all js files                                                                |
| lint:fix      | Running javascript linter to all js files and auto-fixing the issues                                     |
| stylelint     | Running css linters to css files                                                                         |
| stylelint:fix | Running css linters to css files and auto-fixing the issues                                              |                                                                      |
| test          | Starting a local server to preview a production build                                                    |                                               |
| test:watch    | Running tests in watch mode, meaning it continuously watches for file changes and reruns relevant tests. |                                                                    |

## What does this app do?
That is a simple application renders a table with repositories coming from github using github api. Along with this table we have search, filter and pagination functionalities.
Whenever user makes a change with those the application remembers it even if you close the application and open it later.

## Tech Stack
-React, TypeScript, React Query, CSS Modules