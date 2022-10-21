This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Live @ [https://employee-manage.araj.tk/](https://employee-manage.araj.tk/)

## Build Process

<details>
  <summary><h4>Using npm only</h4></summary>
  
1. Clone this repository
2. install Node and npm
3. run command "npm install"
4. Create a MangoDB Cluster
5. set up mangodb cluster for your local ip
6. Save credentials in your env file accordingly
.env file
```
DB_URI=
```
.env.local file
```
NEXT_PUBLIC_JWT_SECRET=
NEXT_PUBLIC_DB_URI=
```
7. run command "npm start" to start server
8. run command "npm run dev" before editing any react file
9. Done !!

</details>

<details>
  <summary><h4>Using Docker</h4></summary>
  
1. Clone this repository
2. Install Docker in your
3. Create a MangoDB Cluster
4. set up mangodb cluster for your local ip
5. Save credentials in your env file accordingly
.env file
```
DB_URI=
```
.env.local file
```
NEXT_PUBLIC_JWT_SECRET=
NEXT_PUBLIC_DB_URI=
```
6. run command sudo chmod +x exec.sh
7. run ./exec.sh

</details>
All Done app should be running on port 3000


#### Setup Admin Account 

1. Open script.js in root directory
2. change the variables adminName, adminEmail, adminPassword and save
3. Run command npm run script (automatically done if using docker)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/). These endpoints can be edited in `pages/api/`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
