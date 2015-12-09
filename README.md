# Spawn
A web application for spontaneous social events. Spawn is a project for CS 316 - Database Systems at Duke University, created by Sam Ginsburg, Ethan Gottlieb, Joe Jacob, and Greg McKeon.

## Code Structure Overview
Spawn was created using Javascript, HTML, CSS, and the Meteor.js full-stack framework. We also used the Facebook Graph API, Google Maps API, and Bootstrap.

The code structure follows standard Meteor guidelines. The application directory is split into three main directories: client, lib, and server. 
The lib folder contains all collections, the app router, and global variables and functions. In Meteor, the lib directory is compiled first because many of its elements are essential to many features of any application.
The server folder contains server code including the setup of Facebook connections. This is fundamental to the application because a user cannot add or join events without logging into Facebook. 
The client folder contains all CSS, stored in the stylesheets subdirectory, and HTML for the app is in the form of templates along with its companion JavaScript code, stored in the templates subdirectory. The templates subdirectory contains many different templates that contain code for individual UI and backend components of the application. This allows us to reuse templates for different aspects of the application without needing to rewrite code. 
 
## Compiling and Deploying
We have the website able deployed on three mediums:

- Meteor hosting
	- To compile, type "meteor run" into the terminal in the root directory, and visit "http://localhost:3000/". We have also deployed the app at www.spawn.meteor.com; however, due to Meteor rate limits, only minimal requests can be made on this website.
- AWS
	-  We compile the system locally, and then AWS will host the website on http://ec2-52-90-146-92.compute-1.amazonaws.com/.  
- Local server
	- We also have the alternative of hosting the server locally and exposing our computer’s local host to public connections. The system is compiled through “meteor run”, and afterwards, it’s deployed onto the local host. 


## Current Implementation Limitations
The app is fully-functional. We will continue to improve UI and add extra features such as: inviting friends to events, add the ability to allow hosts to edit their events, upload media to events, and allow users to update profile settings.
