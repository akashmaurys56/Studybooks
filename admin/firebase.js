var firebaseConfig = {
apiKey: "YOUR_KEY",
authDomain: "YOUR_DOMAIN",
projectId: "YOUR_PROJECT"
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}