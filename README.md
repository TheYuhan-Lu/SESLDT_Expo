## Project Title

The Smartphone-Enabled Slit Lamp Device

## Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Screens](#screens)
- [Project Success Criteria](#project-success-criteria)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About The Project

This project introduces a handheld, portable slit lamp integrated with smartphone technology, designed to revolutionize eye examinations by enabling patients to capture images of their eyes using their smartphones, facilitating remote consultations with ophthalmologists.

### Built With

- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [Expo](https://expo.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn
- Expo CLI

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/TheYuhan-Lu/SESLDT_Expo/.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up Firebase
   - Create a Firebase project and enable Firestore and Firebase Authentication.
   - Add a web app to your Firebase project to get the configuration object.
   - Create a `firebaseConfig.js` file in your project and add your Firebase configuration.

   ```javascript
   // firebaseConfig.js
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';
   import { getStorage } from 'firebase/storage';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   const auth = getAuth(app);
   const storage = getStorage(app);

   export { db, auth, storage };
   ```

4. Start the project
   ```sh
   expo start
   ```

## Usage

### Screens

1. **ChatListScreen**
   - Displays a list of chat participants.
   - Fetches data from Firestore and navigates to ChatDetailScreen on item press.

2. **HomeScreen**
   - Displays a video container and the latest record.
   - Integrates ProfileCard and RecordCard components.

3. **ProfileInfoScreen**
   - Allows users to view and edit their profile.
   - Includes profile details and a RecordCard for viewing records.

4. **RecordListScreen**
   - Displays a list of records.
   - Fetches user role from Firestore and displays records accordingly.


### Future Goals

#### Advanced Image Analysis

**Criteria:** Implement image analysis algorithms to automatically detect common eye conditions from the captured images, providing preliminary assessments to the doctors.

**Status:** Not Started. This would involve integrating machine learning models capable of analyzing eye images for common conditions, requiring further development and validation.


## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact


Project Link: [https://github.com/TheYuhan-Lu/SESLDT_Expo](https://github.com/TheYuhan-Lu/SESLDT_Expo)

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [Expo](https://expo.dev/)
- [Best README Template](https://github.com/othneildrew/Best-README-Template)
