![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# (Tech) Blog

## Description

This project is a full stack project that uses node.js, express.js, mysql, sequelize, and handlebars to build up the project.  The project itself is in the same directory as this README.md file for download and use, while a live version is deployed [here](https://blog-of-things-tech-9bcc541378b3.herokuapp.com/). If the link doesn't work or you wish to use the site in a local server, you can clone the project and deploy it or use it locally.  The purpose of the application was to create a full-stack blog application.  As it was built and has been used, the blog was meant to share articles which explain and technology concepts, describe techological developments, or advance ideas related to the advancement of technology.  As a blog, it can be used for any other similar purpose because, at root, it is an application in which users can create user accounts, write articles, and comment on the articles of others.  This basic function can work in a variety of environments. Attached is a screen shot of the initial homepage. ![screen shot](/views/images/Screencapture.png) 

 ## Table of Contents

[Installation](#Installation)

[Usage](#Usage)

[Contributing](#Contributing)

[Tests](#Tests)

[License](#License)

[Questions](#Questions)

## Installation
Prerequisites are that you must already have node.js and mysql installed on your system.  

To install locally please follow the following steps:
1. Clone the directory 
2. Run "npm install" in the terminal to install all the required dependencies  
3. Fill the .env file needs to be filled out according to your local system
4. "SOURCE" the db/schema.sql file in mysql and then type "npm run seed" in node.js. 
5. You can change the data in blog_db to fit your own needs and change the blog title in the main.handlbars page. 
6. Run "npm start"  in node.js to start the application.  



## Usage
To use the application either navigate to the public[ heroku url](https://blog-of-things-tech-9bcc541378b3.herokuapp.com/)  or use "localhost:3001" for the local copy if you followed the directions in the "installation" section. 

After navigating to the home page you will be required to login or create an account. To make an account you need to use an unique email and a password thats at least 8 letters long.

After you login you can click on all the links and explore the content that is there and comment on the posts or go to your "dashboard" and create your own blog post.  Also from the "dashboard" you can update or delete one of your own blogs as well as look at the comments others have made on your posts (this can also be done by simply clicking on one of the titles in the home page).



## Tests
There are no pre-prepared tests that have been created to test the application.  

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Questions/Comments
If you have any questions, comments or advice on the project feel free to write me at the email address listed below.  

## Contributing
I have not created an initial splash page for the site, and intend to work on that in the future. 

If one would like to contribute to the repository for that or any other reason feel free to email Brian Wiley at bswiley@gmail.com.  
