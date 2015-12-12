# Spawn
A web application for spontaneous social events. Spawn is a project for CS 316 - Database Systems at Duke University, created by Sam Ginsburg, Ethan Gottlieb, Joe Jacob, and Greg McKeon.

http://ec2-52-90-146-92.compute-1.amazonaws.com/ 

## Code Structure Overview
Spawn was created using Javascript, HTML, CSS, and the Meteor.js full-stack framework. We used the Facebook Graph API, Google Maps API, and Bootstrap.

The code structure follows standard Meteor guidelines. The application directory is split into three main directories: client, lib, and server. 
The lib folder contains all collections, the app router, and global variables and functions. In Meteor, the lib directory is compiled first because many of its elements are essential to many features of any application.
The server folder contains server code including the setup of Facebook connections. This is fundamental to the application because a user cannot add or join events without logging into Facebook. 
The client folder contains all CSS, stored in the stylesheets subdirectory, and HTML for the app is in the form of templates along with its companion JavaScript code, stored in the templates subdirectory. The templates subdirectory contains many different templates that contain code for individual UI and backend components of the application. This allows us to reuse templates for different aspects of the application without needing to rewrite code.
 
## Compiling and Deploying
We used local-only deployment during development and testing, and we considered two main options for where to publicly deploy Spawn:

- Local-Only Deployment
	- It is first required to have the Meteor framework installed. This can be downloaded from their website, https://www.meteor.com/.
	- To compile and run, type "meteor run" into the terminal in the root directory of the Meteor app (//Spawn/spawn), and then visit "http://localhost:3000/".
	- This option lets you quickly see the app running, but changes are not synced between different computers, since your local computer acts as both the server and client.
- Meteor hosting
	- Meteor offers a free hosting service for small-scale apps built using its framework.
	- We chose not to deploy using this method since Meteor has strict, low rate limits in place which cause the app the stop functioning and cause unexpected behavior if exceeded. Additionally, this method seemed unreliable and we ran into many odd errors which caused us to choose the more reliable AWS method.
- AWS
	-  We compile the system locally, and then AWS hosts the website on http://ec2-52-90-146-92.compute-1.amazonaws.com/.
	-  We use the Meteor Up (mup) NPM package to configure settings and handle most of the complexities of deploying to AWS
	-  Steps
		-  Setup an AWS Machine Instance running Ubuntu.
		-  Locally, install node.js and the npm package manager for it, and then use npm to install the "mup" package (npm install -g mup).
		-  Move to the root spawn application directory (//Spawn/spawn) and run "mup init". This should have generated two files, "mup.json" and "settings.json".
		-  Edit mup.json to the settings used in the mup.json we have in our GitHub repository (https://github.com/sam-ginsburg/Spawn/blob/master/spawn/mup.json). Change settings as needed to customize for your own personal AWS machine and for things such as your SSH key for that machine. Specifically, you will likely need to change the "host", "pem", and "ROOT_URL" fields. You do not need to edit the settings.json file.
		-  Now run "mup setup" and then "mup deploy". This should complete the deployment process to AWS, and you should be able to use the app by navigating to your AWS server's url.
		-  For more details, see the page with the instructions which we originally followed at http://sergelobatch.com/slog/2015/4/10/using-mup/.

## Current Implementation Limitations
The app is fully-functional. We will continue to improve UI and add extra features such as: inviting specific friends to events, adding the ability to allow hosts to edit their events, uploading media such as photos to events, and allowing users to update profile settings such as blocking users.
