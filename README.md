<h1 align="center">
  <a href="https://github.com/hicsail/noiseScore2/"><img src="assets/one-hand-87.jpg" alt="NOISE-SCORE Icon" width="150"></a>
  <br>
  <br>
  NOISE-SCORE
  <br>
  <br>
</h1>

## Noise tracking mobile app to help individuals identify noise pollution in their area

The NoiseScore application utilizes smart phone technology to capture both the objective and subjective nature of the sounds you encounter as you go about your daily routine. 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes in a mobile emulator instance of your choice of platform.

## Setting up your environment

### Built With

The frontend was built primarily with the [React Native](https://facebook.github.io/react-native/) framework.
  * React
  * JavaScript

The backend was built primarily with SAIL's in-house backend, [Anchor](https://github.com/hicsail/anchor).
  * Node.js
  * hapi.js
  * MongoDBz


### Prerequisites

If you are new to Java, React Native, Node.js, or MongoDB, please first:

* Download and install Java from https://www.java.com/ES/download/
* React Native from the [official website](https://facebook.github.io/react-native/)
* Install Node.js from the [official website](https://nodejs.org/), or if you have `homebrew` installed, you can use `brew install node` instead
* Install MongoDB from the [official website](http://www.mongodb.org/downloads)

### Installation and Setup

First, you will need to clone this repo before installing all the `npm` dependencies in both the `server` folder and the project root directory. After that, you will need to run some first-time setup for the server. You can finally get the app up and running properly after creating and running an instance of both the server and client.

You can follow step-by-step instructions for the full process below:

* clone this repo at `https://github.com/hicsail/noiseScore2.git`

### Server setup
* `cd` into the folder where the repo is located
* `cd` into the `server` folder and run `npm install`
* Prepare your MongoDB instance by first starting `mongod` _without authentication_: `mongod --dbpath "<your_db_path>"` (in a separate terminal window)
* If you have never run this server before, and you want to access and view data collected through the app as an Administrator, run `npm run first-time-setup` to create the Admin user.
* Start the server by running `npm start`


### React-Native setup
* Open a separate terminal window and `cd` into the root directory
* If setting up this project for the first time, run `npm install`
* Testing for iOS
    * Run `npx pod-install ios` to make sure that all the React Native packages are properly linked
    * For M1 Macs users, run these commands instead: `sudo arch -x86_64 gem install ffi` and `arch -x86_64 pod install` 
    * Run `npm run ios` - this command should start running the NoiseScore app on an iPhone simulator and open a separate terminal window running the Metro bundler
* Testing for Android
    * Tell your terminal where your ANDROID_HOME and ANDROID_ROOT_SDK are by running the following commands (the path should look something like `/Users/{your_username}/Library/Android/sdk`)
        * `export ANDROID_HOME=/Users/{your_username}/Library/Android/sdk`
        * `export ANDROID_ROOT_SDK=/Users/{your_username}/Library/Android/sdk`
        * This is so your terminal can find your Android emulators and other Android components to be recognized.
    * Run `npm run android` - this command will work much the same as `npm run ios` above; it will start the NoiseScore app on an Android emulator and open a separate terminal window running the Metro bundler

## Deployment
The NoiseScore server is currently deployed on an AWS EC2 instance.  For developers at SAIL, please follow documentation found in the SAIL Dropbox for updating the server there (2020.01.31.noise.score.aws.server.docx).

The React deployment docs are fairly straightforward and are linked below. The NoiseScore server is running without HTTPS connection due to legacy deployments but this should ideally be changed.  Until that point, please see the notes about allowing HTTP traffic in each section below.

### iOS
The React docs for building minified code for iOS can be found [here](https://reactnative.dev/docs/publishing-to-app-store)

Note: you must skip step one because we are not using HTTPS connection to the server at the moment.

### Android
The React docs for building a signed .aab file for Android can be found [here](https://reactnative.dev/docs/signed-apk-android). The most important parts are the first four steps.

Note: to allow HTTP connection to Android apps, follow this [StackOverflow answer](https://stackoverflow.com/a/62477085) and add the `android:usesCleartextTraffic="true"` field to the `application` tag in AndroidManifest.xml in `android/app/src/main/`.

### Generated files
Please don't commit files generated by the build steps, especially files that contain our API keys. The files below do not usually need to be committed unless you manually change anything there (which may happen if you need to manually add any permissions or packages). Here's what not to commit in each:
* The Android `.aab` file
* `android/app/build.gradle` - keystore credentials
* `android/app/src/main/AndroidManifest.xml` - API key
* `android/app/src/main/assets/heatmap.html` - API key
* `android/gradle.properties` - keystore credentials
* `ios/Podfile.lock` - this is like a package-lock for iOS, so same rules as that
* `ios/heatmap.bundle/heatmap.html` - API key
* `ios/noiseScore/AppDelegate.m` - API key
* `ios/noiseScore.xcodeproj/project.pbxproj` - this just gets generated/changed for every build
* `ios/noiseScore.xcodeproj/xcshareddata/xcschemes/noiseScore.xcscheme` - this also gets generated/changed for every build
* `src/components/heatmap.html` - (not generated from build but still has API key)

## Developer Notes

* This project was last developed with Node 14.15, npm 6.14.11, and ReactNative 0.65.
* This project uses a forked version of the [KeyboardAwareScrollView](https://github.com/codler/react-native-keyboard-aware-scroll-view) package. This fork seems to be maintained well enough to use, but if any problems arise, it may be necessary to switch to a different version or fork the package ourselves.
* Navigation to the Home page from the Login page is done using React Native Navigation's `push()` function instead of `navigate()`. This adds the Home page to the navigation stack, but so far it seems to not clog up the navigation stack with multiple copies of the stack.
* Instructions for configuring Google Maps for iOS and Android can be found [here](https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md).
* `react-native-vector-icons` needed to be explicitly loaded for the Android build following the instructions [here](https://stackoverflow.com/questions/38878852/react-native-vector-icons-wont-show-in-android-device).
