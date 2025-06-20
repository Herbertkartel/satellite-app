Interactive Satellite Image Viewer


Placeholder image for the welcome banner - replace with an actual captivating satellite view.

A dynamic and user-friendly web application built with Next.js and Leaflet.js, designed to provide actionable insights by visualizing current and historical high-resolution satellite imagery. Explore geographical patterns, monitor environmental changes, and support decision-making across various applications.
Table of Contents

    Features

    Technologies Used

    Installation & Setup

        Prerequisites

        Cloning the Repository

        Firebase Configuration

        Installing Dependencies

        Running the Development Server

    Usage

    Project Structure

    Contributing

    License

    Contact

Features

    Dynamic Map Viewing: Seamlessly pan and zoom across a global map powered by Leaflet.js.

    Satellite Image Overlays: Dynamically select and overlay high-resolution satellite images fetched from Firebase.

    Adjustable Opacity: Control the transparency of satellite overlays to compare with underlying map layers.

    Image Details on Click: Click on an overlaid image to view detailed information such as acquisition date, category, and region.

    Responsive Design: Optimized for a smooth viewing experience across desktop and mobile devices, featuring a collapsible navigation menu on smaller screens.

    Thematic Sections: Dedicated sections for "About the Viewer," "Key Applications & Impact" (with visual aids), and "How to Use."

    Firebase Integration: Fetches available satellite image metadata (URL, bounds, details) from a Firestore database.

Technologies Used

    Next.js (React Framework): For server-side rendering, routing, and a structured React environment.

    React.js: For building the user interface components.

    Leaflet.js: An open-source JavaScript library for interactive maps.

    Firebase Firestore: A NoSQL cloud database used to store and retrieve metadata about satellite images.

    Firebase Authentication (Implicit/Canvas): For secure interaction with Firestore within the Canvas environment.

    HTML & CSS (Inline Styles/Styled JSX): For structuring and styling the application.

Installation & Setup

Follow these steps to get a copy of the project up and running on your local machine.
Prerequisites

Before you begin, ensure you have the following installed:

    Node.js: (LTS version recommended) https://nodejs.org/

    npm (comes with Node.js) or Yarn (optional):
    npm install -g yarn

    Git: https://git-scm.com/

Cloning the Repository

First, clone the project repository to your local machine:

git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME

(Replace YOUR_GITHUB_USERNAME and YOUR_REPOSITORY_NAME with your actual GitHub details.)
Firebase Configuration

This application uses Firebase Firestore to store satellite image data. You'll need to set up your own Firebase project and configure it.

    Create a Firebase Project:

        Go to the Firebase Console.

        Click "Add project" and follow the steps to create a new project.

    Enable Firestore Database:

        In your Firebase project, navigate to "Firestore Database."

        Click "Create database" and choose to start in "production mode" (you'll set up rules later). Select a location.

    Add Configuration to .env.local:

        Create a file named .env.local in the root of your project directory (./.env.local).

        Get your Firebase configuration details from your Firebase project settings (Project settings -> General -> Your apps -> Web app -> Firebase SDK snippet -> Config).

        Add them to your .env.local file like this:

    NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID # Optional

    Replace YOUR_API_KEY, YOUR_AUTH_DOMAIN, etc., with your actual Firebase config values.

    Firestore Data Structure:
    Your Map.js component expects a Firestore collection named satelliteImages. Each document in this collection should have the following fields:

        name (string): Display name of the image (e.g., "Kampala City Center, 2023").

        url (string): URL of the image (e.g., a hosted image, Google Maps Static API, etc.).

        bounds (map/object): Geographic bounds of the image overlay. Should contain north, south, east, west (numbers).
        Example: {"north": 0.35, "south": 0.3, "east": 32.6, "west": 32.5}

        dateAcquired (string): Date the image was acquired (e.g., "2023-05-10").

        category (string): Category of the image (e.g., "Urban", "Agriculture", "Forest").

        region (string): Geographic region (e.g., "Uganda", "East Africa").

    You'll need to manually add some sample documents to your satelliteImages collection in Firestore to see the map functionality.

    Firebase Security Rules (for testing):
    For local development, you might relax your Firestore rules to allow read access. Remember to secure your rules before deploying to production!

    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /satelliteImages/{document=**} {
          allow read: if true; // Allows anyone to read (for development only)
          allow write: if request.auth != null; // Only authenticated users can write
        }
      }
    }

    For Canvas specific development, refer to the storage instructions from the initial prompt which outline using __app_id and __initial_auth_token for authenticated reads/writes within the Canvas environment.

Installing Dependencies

Once the repository is cloned and Firebase is configured, install the project dependencies:

npm install
# OR
yarn install

Running the Development Server

After installing dependencies, start the Next.js development server:

npm run dev
# OR
yarn dev

Open http://localhost:3000 in your browser to view the application.
Usage

    Navigation: Use the fixed navigation bar at the top to jump between sections (Home, About, Applications, Live Map, How to Use).

    Mobile Menu: On smaller screens, click the "Menu" button in the header to toggle the navigation links.

    Select Satellite Image: In the "Live Satellite Map" section, use the dropdown menu to select a satellite image layer to display on the map. The data for this comes from your Firebase Firestore.

    Adjust Opacity: Use the "Overlay Opacity" slider to control the transparency of the selected satellite image layer.

    Explore Map: Pan and zoom the map using standard mouse controls.

    View Image Details: Click anywhere on an active satellite image overlay on the map to see a popup with its details (name, date acquired, category, region).

Project Structure

.
├── public/                 # Static assets (images, fonts)
│   └── images/
│       ├── agriculture.jpg
│       ├── environment.jpg
│       ├── urban_disaster.jpg
│       └── welcome_banner.jpg
├── src/
│   ├── app/                # Next.js App Router root
│   │   ├── page.js         # Main home page component
│   │   └── components/     # Reusable React components
│   │       └── Map.js      # The Leaflet map component
│   └── lib/                # Utility functions, Firebase config
│       └── firebase.js     # Firebase initialization and exports (db, auth)
├── .env.local              # Environment variables (Firebase config)
├── .gitignore              # Files/folders to ignore from Git
├── package.json            # Project dependencies and scripts
└── README.md               # This file

Contributing

Contributions are welcome! If you find a bug or have a feature suggestion, please open an issue or submit a pull request.

    Fork the repository.

    Create a new branch (git checkout -b feature/your-feature-name).

    Make your changes.

    Commit your changes (git commit -m 'feat: Add new feature').

    Push to the branch (git push origin feature/your-feature-name).

    Open a Pull Request.

License

This project is licensed under the MIT License - see the LICENSE file for details.
Contact

For any questions or feedback, please reach out:

    GitHub Issues: https://github.com/Herbertkartel (Recommended)

    bayoherbert3@gmail.com
