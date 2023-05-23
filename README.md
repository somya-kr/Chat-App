# Realtime Chat App

This documentation provides a step-by-step guide for installing and deploying a realtime chat app developed using React and Firebase. The app allows users to chat in real-time and is built using React for the frontend and Firebase for the backend.

### Prerequisites

Before proceeding with the installation, ensure that you have the following prerequisites installed:

- Node.js (version 12 or above)
- NPM (Node Package Manager)
- Firebase account (sign up at [Firebase](https://firebase.google.com/))


### Firebase Configuration

- Go to the Firebase Console ([Firebase Console](https://console.firebase.google.com/)) and create a new project.
- Enable the **Firestore** and **Authentication** services for your project.
- Create a new web app in your Firebase project and copy the Firebase configuration object.

## Deployment using Firebase

To deploy the realtime chat app to Firebase, follow the steps below:

### Step 1: Initialize Firebase Hosting

If you haven't already, install the Firebase CLI by running the following command:

`npm install -g firebase-tools`

Then, log in to your Firebase account by running:

`firebase login`

Navigate to the project directory and initialize Firebase hosting by running:

`firebase init hosting`

### Step 2: Build the App

Before deploying, build the app for production using the following command:

`npm run build`

### Step 3: Deploy to Firebase Hosting

To deploy the app to Firebase hosting, run the following command:

`firebase deploy --only hosting`

Once the deployment is complete, Firebase will provide you with the hosting URL where your app is deployed.


