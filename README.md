# Library
A web application built with express that displays book list. Using the [goodreads API](https://www.goodreads.com/api),
certain books requested are stored in the database using MongoDB. Registered users can access the book list.

## Getting Started
Fork and clone the repository to have a copy of the project on your local machine.

### Prerequisites
After you have downloaded the project on your local machine. run `npm install` to get the necessary dependencies
required for the application to work. These can be found in the `package.json` file.

The application runs on port **4000** but you can modify that in the `package.json` file, if you wish for the 
app to run on another port.

The application uses `DEBUG` dependency to print out to the console. if you are using a **UNIX** machine, you will
have to alter the **start** property of the `NPM scripts` to **DEBUG=app, app:* nodemon app.js**,
in order for the application to run on the desired port.