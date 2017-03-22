# Upgrading version

It's strongly recommended to use [Semantic Versioning](http://semver.org/). Commonly Node modules
use this kind of versioning, so we should follow this pattern.


## Changes should be handled as follows:

**Imagine the project is at 1.0.0 version**

  * Bug fixes and other minor changes: Patch release, increment the last number, e.g. 1.0.1
  * New features which don't break existing features: Minor release, increment the middle number, e.g. 1.1.0
  * Changes which break backwards compatibility: Major release, increment the first number, e.g. 2.0.0


## The CHANGELOG.md:

**Important:** All the changes a version implements, must be reflected at the CHANGELOG.md file.

### What’s a change log?
A change log is a file which contains a curated, chronologically ordered list of notable changes
for each version of a project.

### What’s the point of a change log?
To make it easier for users and contributors to see precisely what notable changes have 
been made between each release (or version) of the project.

### How should I write it?
The CHANGELOG will store the changes a version implements. So... Imagine you are doing the
new feature "super-cool-feature". Once you finished it, you write at the [UNRELEASED] section of
the CHANGELOG this "super-cool-feature".

Finally when the project has to be upgraded, we will move from [UNRELEASED] to the respective version
every features, fixes... which the version will include.


## Upgrading the version:

To upgrade the version you can execute the following command:
`npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git] -m "Upgrade to %s for reasons"`

Anyway at the `scripts` section in package.json, there are 3 scripts to make easier the version upgrading:
  * **version-major** - `npm run version-major`
  * **version-minor** - `npm run version-minor`
  * **version-patch** - `npm run version-patch`
