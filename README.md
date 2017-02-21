# lecture8-thuhe

Styling our React code

## Upgrade Node version to 6

```$ nvm install 6```

## Installing Webpack globally

This line installs Webpack on your Cloud9 workspace, kind of like how you might
install from a package or `brew install` something.

```$ npm install -g webpack```

## Installing `npm` dependencies from `package.json`

This line starts up `npm`, which looks inside `package.json`, gets a list of
packages, and installs them to the `node_modules` folder inside your repository.

```$ npm install```

## Compiling Javascript using Webpack

This line starts up Webpack, which looks inside `webpack.config.js`, loads
configuration options, and starts transpiling your JS code into `static/script.js`.

```$ webpack --watch```

(The program should not stop running. Leave it running.)

## Edit a JS file

Make a change to `scripts/Content.js`. Webpack should detect the change and
print a bunch of stuff.

**Do not manually edit `static/script.js`!!**

## Run the web app

Run `app.py` and verify that the React renders. Click on "Send up a random
number!". The page should interactively update.

## Figure out how the styling happens

* `static/style.css` has all of the styles used
* The HTML for this is generated by React, in `Content.js`.

How do you create an HTML element with a particular `class` in React?

## Style the page more!

As a start, make the heading a different color. This only needs a change in
CSS!

Next up, make the list from a bulleted list `<ul />` into a numbered list `<ol />`.
This only requires a change in React.

Lastly, take the content and center it. You'll need to edit both React code
as well as CSS for this to happen!

## Finished?

Try to add this:

* Make each item fade in instead of popping up
* Make the server send the list when the client connects
* Add a button that clears the list
