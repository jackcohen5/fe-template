# Using this template

In order to use this template, you will first need to follow the following steps.

## Setup Netlify

1. Create a new site in Netlify from the cloned template. Ensure [builds are stopped](https://docs.netlify.com/configure-builds/stop-or-activate-builds/). /shrug

2. Add an API_LOCATION environment variable to your Netlify site with the URL of your API.

3. Create a [Netlify access token](https://docs.netlify.com/cli/get-started/#obtain-a-token-in-the-netlify-ui) and add the `NETLIFY_AUTH_TOKEN` environment variable to your Github Actions configuration.

**Note:** You must connect Netlify to your Github account/organization for this step.

## Setup Firebase

1. Create a development project in Firebase with a web app and add the project ID (`FIREBASE_PROJECT_ID`) and web app API key (`FIREBASE_API_KEY`) to a .env file in your project's root directory.

2. Repeat the above, creating production and staging projects in Firebase and add the project IDs and API keys to your Netlify environment variable config.

3. Enable Firebase Authentication and create a Firestore database.

4. Enable email authentication in your Firebase Authentication config.

## Setup Logrocket

1. Create a Logrocket project and add the client key to your Netlify environment variable config.

## Setup branch protection

1. Add a new branch protection rule on your repo's main branch in Github, requiring the CI Github Action checks to pass before any merges can occur.
