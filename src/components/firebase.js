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

    register(name, email, password) {
      const reg = new Promise((resolve, reject) => {
        resolve(this.auth.createUserWithEmailAndPassword(email, password))
      })
      .then(() => {
        return this.auth.currentUser.updateProfile({
          displayName: name,
        })
      })
    }
}

export default new Firebase();