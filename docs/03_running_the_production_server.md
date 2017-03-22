# Running the Production Server

First, find the command. 

`npm run` will show you a list of the available commands in this project.

Before executing the production server, we have to build the bundle which the server will serve to
the client:

`npm run build`

WebPack will build into `static/dist` the output bundle and update/create the `./webpack-assets.json` file.

Now, you can run the server!

`npm start` or `npm run start-prod` to run the production server

Now, open up your browser to [port 8080](http://localhost:8080/):

You are now running the production kit on your local machine.


## Configure Processes
TODO


## The Take Away

You cloned the repository, installed all the packages, and ran the development server locally.  
You are now ready to code on the application.
