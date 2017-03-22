# Running the Development Server

First, find the command. 

`npm run` will show you a list of the available commands in this project.

Now, run it!

`npm run dev` to run the development server

We run:

*  A *watch client* to trigger webpack to rebuild if we change code.
*  A *webpack dev server* which serves your application on port 3000.  It also grabs port 3001
   for status and internal information, such as [polling middleware](http://localhost:3001/__webpack_hmr).
   You could try installing [BrowserSync](https://www.browsersync.io) to see something more interesting.
   
You can see WebPack rebuilding static assets into `./webpack-assets.json`.  If you check the id, you
can also view it on port 3001.

Now, open up your browser to [port 3000](http://localhost:3000/):

You are now running the kit on your local machine.


## Running isolated processes

We know how to run an all-in-one command `npm run dev` to start our development environment, which
runs two different processes a **watch client** and a **webpack dev server**.

But, What about, if we'd like to run them separately?. We are able to run in two different processes
the following commands:

*  `npm run watch-client` to execute the *watch client*.
*  `npm run start-dev` to execute the  *webpack dev server*. 


## Configure Processes
TODO


## The Take Away

You cloned the repository, installed all the packages, and ran the development server locally.  
You are now ready to code on the application.
