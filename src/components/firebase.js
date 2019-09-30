const { app, auth, firestore } = require('firebase');
const firebaseConfig = require('../../firebase.config.js')

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = auth();
        this.db = firestore();
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signOut() {
        return this.auth.signOut();
    }

    async register(email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return;
    }
}

export default new Firebase();