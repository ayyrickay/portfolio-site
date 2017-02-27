# portfolio-site

Ricky Holtz's portfolio website

## Getting Started

Clone or fork the repository. Run `npm install` to install dependencies

### gulp
Run the gulp command to launch a local version of the website. It will automatically open on `localhost:3000`, and will live reload with code changes to the site

### deploying
HTML files are generated with each change to the site, and deployed on the `gh-pages` branch. To update the live site, simply push changes and create a pull request to `gh-pages`. Once the pull request is accepted, the changes will go live.

## Git model

We use the following branch conventions to ensure the stability of the codebase.

### `gh-pages`

This is a long-living branch off of master where active development work gets merged in via feature/, refactor/, or chore/ branches. Do not commit to this branch directly.

### `feature/`

Create a temporary `feature/your-feature-name` branch off of `gh-pages` whenever you want to submit work through the normal release cycle. Your branch lives for as long as it takes for the feature to be complete enough to merge into `gh-pages`, at which point you should rebase `gh-pages` one final time, merge into `gh-pages`, then delete your branch.


### `chore/`

General maintenance to architecture, dependencies, or files like the README.md should happen on a temporary `chore/your-task` branch off of `gh-pages`. Use the appropriate process for merging a `feature/`.

### `refactor/`
Refactoring or rewriting production code should happen on a temporary `refactor/your-refactoring-focus` branch off of develop. Use the appropriate process for merging a `feature`. Update the version as a patch.

## Tools

This site was built using Jekyll, SASS and Gulp.
