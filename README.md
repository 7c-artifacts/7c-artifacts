# 7C Artifacts

This is a website made to display artifacts as a sharing website and resource for students in Singapore American School. It’s made using React, Tailwind.css, DaisyUI, and Next.js, bootstrapped with `create-next-app`.

## Testing locally

To test it on your own computer, make sure you have [npm](https://npmjs.com), [yarn](https://yarnpkg.com), and [GitHub CLI](https://cli.github.com) installed. Then clone this repo by `cd`ing to any directory and running
```bash
gh repo clone 7c-poems/7c-poems
```
Navigate to that file using
```bash
cd 7c-poems
```
Then install all required dependencies using
```bash
yarn
```
To setup the database, use a MySQL database (install locally if required or use production database). Sqlite is not supported because of concurrent row saving which doesn't work in sqlite.

Start a development server with
```bash
yarn dev
```

Then, the website will be available at <https://localhost:3000>.

## Environment variables

There are 6 enviornment variables required. Create a .env file at the root of your environment with this:
```
GOOGLE_ID=__INSERT_GOOGLE_OAUTH_ID__
GOOGLE_SECRET=__INSERT_GOOGLE_OAUTH_SECRET__
NEXTAUTH_SECRET=__INSERT_NEXT_AUTH_SECURITY_SECRET__
NEXTAUTH_URL=__INSERT_PAGE_URL__ # Locally, insert https://localhost:3000/
MYSQL_PASS=__INSERT_MYSQL_PASSWORD__
MYSQL_USERDB=__INSERT_MYSQL_USER_AND_DB__ # DB name and username should be the same in production
```

## Stack

This website uses Next.js and React. For frontend, we use Tailwind.css and DaisyUI. For our database, we use MySQL and the Sequelize ORM. 

## Bootstrapped README
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)—learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn)—an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)—your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Bugs and feature requests

If you find a problem with 7C Artifacts or want to request a new feature, use the issue feature. Search for issues similar to your request first—if nothing matches them, create a new issue.

## Copyright and license

7C Artifacts is copyright 2022 by the contributors. Code is licensed under Apache-2.0.
