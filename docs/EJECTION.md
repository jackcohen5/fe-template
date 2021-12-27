# Using this template

In order to use this template, you will first need to follow the following steps.

## Setup Netlify

1. Create a new site in Netlify from the cloned template. 

2. Add an API_LOCATION environment variable to your Netlify site with the URL of your API. 

**Note:** You must connect Netlify to your Github account/organization for this step.

## Setup Firebase

1. Create a development project in Firebase and add the project ID and web API key to a .env file in your project's root directory.

2. Create production and staging projects in Firebase and add the project ID and API key to your Netlify environment variable config.

3. Enable Firebase Authentication and create a Firestore database.

## Setup Firestore

1. Create a Logrocket project and add the client key to your Netlify environment variable config.

## Setup Logrocket

1. Create a Logrocket project and add the client key to your Netlify environment variable config.

## Setup branch protection

1. Add a new branch protection rule on your repo's main branch in Github, requiring the CI Github Action checks to pass before any merges can occur.
