# GUESS THAT IMAGE

# DESCRIPTION
Guess That Image is an online web based game that challenges users to guess the identity of zoomed-in images within a given time limit. With a variety of themes and difficulty levels, users can test their recognition skills across categories like cars, animals, clothing brands, locations, video games, and more. The game features a user-friendly interface, scoring system, leaderboards, and the ability to share challenges with friends.

# HOW TO INSTALL AND RUN
## PREREQUISITES
### Install Node.js for npm
https://nodejs.org/en/download/current
### Install MongoDB Community Server (keep "use as a service" checked) (MongoDB Compass should be included in the installer) 
https://www.mongodb.com/try/download/community

## BACKEND PACKAGES TO INSTALL
Navigate to the "backend" folder and run "npm install"

## FRONTEND PACKAGES TO INSTALL
Navigate to the "frontend" folder and run "npm install"

## RUNNING WEBSITE
### Step 1: Setting up database (Choose one) (/backend/.env not uploaded to github repo)
#### Cloud Database
If using MongoDB Atlas, the provided .env will automatically connect to the cloud database. 
#### Local Database
If you are connecting locally, switch to the local MONGO_URI in the .env. Then, in MongoDB Compass, connect to the local MONGO_URI and set up a new database named "GuessThatImage" with the collections named "ImageUrls" and "Users". Import the provided jsons in the "sample data" folder into the "ImageUrls" collection.

### Step 2: Running the server
Run 'npm run dev' inside of the "backend" folder 

### Step 3: Running the website
Run "npm start" inside the "frontend" folder

The website should be fully functional.