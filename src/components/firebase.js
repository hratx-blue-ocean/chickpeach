const app = require('firebase');
const firebaseConfig = require('../../firebase.config.js');

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signOut() {
        return this.auth.signOut();
    }

    register(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }
}

export default new Firebase();