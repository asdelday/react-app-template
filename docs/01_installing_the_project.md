# Installing the Project

To install the project you should:

##  Clone the repository

First you should clone the project from the Git repository.  The easiest way is to use something like this:

`git clone <your repository here> [OPTIONAL: directory]`

## Run npm install

Only part of the project is stored in github.  All the JavaScript libraries upon which the project depends 
are imported using npm, the node package manager.

Npm installs libraries according to the [semvar](https://docs.npmjs.com/getting-started/semantic-versioning) 
minimum versions in the `dependencies` section of `package.json` file.

We also install the packages listed in the `devDependencies` section,  
[because we are installing from source](http://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies).
Every package also has its own `package.json` file containing more dependencies.  Multiple versions 
of the same packages may be listed as dependencies causing copies to be installed in package subdirectories
`./node_modules/*/node_modules`, `./node_modules/*/node_modules/*/node_modules`, etc.

To install all these packages, run `npm install` at your CLI. You should have Node.js and NPM 
installed globally installed in your computer to be able to install them.
