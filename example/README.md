# Example for development

This directory contains the Gatsby.js project for plugin development.

## Setup

### Create dotenv file

```sh
# create .env.local
cp .env.example .env.local

# fill environment variables
vi .env.local
```


### Create microCMS project

In the microCMS project, prepare `posts` content(API) in list format and `setting` content(API) in object format.

- `posts`
  - *list* format
- `setting`
  - *object* format

The fields in each content may be arbitrary.

See the plugin options in `gatsby-v5/gatsby-config.js` or `gatsby-v5/gatsby-config.ts` for more information.


### Install dependencies

```sh
# The X's should be read as numbers.
# e.g. gatsby-v3
cd gatsby-vX

npm ci
```


### Start development server and open GraphQL playground (GraphiQL)

```sh
npm run dev

# check https://localhost:8000/___graphql
```
