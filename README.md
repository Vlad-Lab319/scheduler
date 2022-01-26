INTERVIEW SCHEDULER
===================
## Description
React application that allows users to book and cancel interviews. 
Built using the latest tools and techniques of React, JS, CSS, PostgreSQL, Webpack, Babel, Axios, Storybook, Jest, Cypress. 
Included different tests types (unit, integration, end-to-end).

## Screenshots
!["Scheduler main page"](https://github.com/Vlad-Lab319/scheduler/blob/master/screenshots/scheduler_main.png)
!["Book interview form"](https://github.com/Vlad-Lab319/scheduler/blob/master/screenshots/scheduler_form.png)
!["Delete appointment confirmation"](https://github.com/Vlad-Lab319/scheduler/blob/master/screenshots/scheduler_delete.png)

## Project Setup
- Install scheduler-api from: 

  https://github.com/lighthouse-labs/scheduler-api

-Install scheduler
- Clone repository onto your local device.
- Install dependencies using the 

  npm install 

  command.
- Start the web server using the npm run local command. The app will be served at http://localhost:8080/.
- Go to http://localhost:8080/ in your browser.


## Running Webpack Development Server

If you want to run entire application in development mode: use webpack-dev-server.
```sh
npm start
```

## Running Jest Test Framework

If you want to run unit or integration tests from the command line: use Jest.
```sh
npm test
```

## Running Storybook Visual Testbed

If you want to manually test components in isolation: use Storybook.
```sh
npm run storybook
```

## Running Cypress Test 

If you wan to run automated end-to-end tests in the browser: use Cypress. 

npm install --save-dev cypress
```sh

Run scheduler-api in test mode, then 

npm cypress open -P .
```

## Dependencies

- Node v12.22.9 use this version!

- NPM 5.x or above
- PG 6.x
- Sass
- ExpressJS
- Axios
- React
  