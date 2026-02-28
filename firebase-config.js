// firebase-config.js
// Secure Firebase Configuration for GitHub Pages

(function() {
    // Check if Firebase is already initialized
    if (firebase.apps.length) {
        console.log('Firebase already initialized');
        return;
    }

    // For GitHub Pages, we need to handle different environments
    const firebaseConfig = (function() {
        // Get the current hostname
        const hostname = window.location.hostname;
        
        // Base configuration (same for all environments)
        const baseConfig = {
            apiKey: "AIzaSyABaOMohXrju_OelcUQLAxlIBy809ob3uI",
            authDomain: "ysd2026-upm-tickets.firebaseapp.com",
            projectId: "ysd2026-upm-tickets",
            storageBucket: "ysd2026-upm-tickets.firebasestorage.app",
            messagingSenderId: "350674755825",
            appId: "1:350674755825:web:143f8ee11a2fb568080950"
        };
        
        // Check if we're on your production domain
        if (hostname === 'yourusername.github.io' || hostname === 'your-custom-domain.com') {
            console.log('Production environment detected');
            return baseConfig;
        }
        
        // Check if we're on localhost (development)
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            console.log('Development environment detected');
            return baseConfig; // Same config, but you could use a test project here
        }
        
        // If on any other domain (like someone forking your repo), use restricted config
        console.warn('Unknown environment, using restricted mode');
        return {
            ...baseConfig,
            apiKey: 'RESTRICTED_MODE', // This will cause Firebase to fail gracefully
        };
    })();

    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        
        // Initialize services
        const db = firebase.firestore();
        const auth = firebase.auth();
        
        // IMPORTANT: Set up Firestore security rules to restrict access by domain
        // This must be done in Firebase Console
        
        // Enable offline persistence only after authentication
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.enablePersistence({
                    synchronizeTabs: true
                }).catch((err) => {
                    if (err.code === 'failed-precondition') {
                        console.warn('Multiple tabs open, persistence limited');
                    } else if (err.code === 'unimplemented') {
                        console.warn('Persistence not supported in this browser');
                    }
                });
            }
        });
        
        // Export services
        window.firebaseServices = {
            db: db,
            auth: auth,
            firebase: firebase
        };
        
        console.log('Firebase initialized successfully');
        
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        // Show error but don't expose details
        showUserMessage('Unable to initialize application. Please check your internet connection.');
    }
})();

// Helper function to show user-friendly messages
function showUserMessage(message) {
    // Don't show on every page, just if there's a container
    const errorContainer = document.getElementById('firebase-error');
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }
}
