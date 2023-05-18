# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick Demo

For ease, I have added a version, so you can ignore Local setup steps and just run below command in backend folder

```
node server.js
```

## Local setup

- To Run this Project, clone the frontend(event-dashboard-client) and backend(event-dashboard-backend) and place them in a single Folder.

Run below to install dependencies in both

```
cd event-dashboard-client
npm i
```

```
cd event-dashboard-backend
npm i
```

To build frontend, Run below

```
cd event-dashboard-client
npm run build
```

Once this is done, you will have a folder in backend with `build` as its name.

Run below

```
cd event-dashboard-backend
node server.js
```

This will run a websocket server on 3000 and serve frontend files too.

You can navigate to `http://localhost:3000` to check frontend.
