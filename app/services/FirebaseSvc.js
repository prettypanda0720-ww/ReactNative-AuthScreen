import firebase from 'firebase';
import {Alert} from 'react-native';

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyB0AC_3GFtjvMSYKTLUDHPTh_VoQfnTL5E',
        authDomain: 'vaniday-bfe94.firebaseapp.com',
        databaseURL: 'https://vaniday-bfe94.firebaseio.com',
        projectId: 'vaniday-bfe94',
        storageBucket: 'vaniday-bfe94.appspot.com',
        messagingSenderId: '397007400828',
        appId: '1:397007400828:web:b6089e8c342fea3a463ef9',
        measurementId: 'G-S4EC6MKGJ5',
      });
    }
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get email() {
    return (firebase.auth().currentUser || {}).email;
  }

  get Ref() {
    return firebase.database().ref();
  }

  get msgRef() {
    return firebase.database().ref('messages');
  }

  get usersRef() {
    return firebase.database().ref('users');
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  login = (user, success_callback, failed_callback) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };

  createAccount = user => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function() {
          let userInfo = {
            uid: firebase.auth().currentUser.uid,
            email: user.email,
            password: user.password,
            name: user.name,
            avatar: user.avatar,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          };
          firebase
            .database()
            .ref('users')
            .push(userInfo)
            .then(
              function() {
                Alert.alert('User was created successfully.');
              },
              function(error) {
                console.warn('Error update displayName.');
              },
            );
        },
        function(error) {
          Alert.alert('Create account failed. Error: ' + error.message);
        },
      );
  };

  msgOn = (userId, convUserId, callback) =>
    this.msgRef
      .child(userId)
      .child(convUserId)
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parseMsg(snapshot)));

  parseMsg = snapshot => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {_id, timestamp, text, user};
    return message;
  };

  send = (userId, convUserId, messages) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {text, user, createdAt: this.timestamp};
      let msgId = this.msgRef
        .child(userId)
        .child(convUserId)
        .push().key;
      let updates = {};
      updates['messages/' + userId + '/' + convUserId + '/' + msgId] = message;
      updates['messages/' + convUserId + '/' + userId + '/' + msgId] = message;
      this.Ref.update(updates);
    }
  };

  // close the connection to the Backend
  off() {
    this.msgRef.off();
  }

  getUserlist = callback => {
    this.usersRef.on('child_added', snapshot => callback(snapshot.val()));
  };

  getCurrentUserInfo = async () => {
    var loginId = firebase.auth().currentUser.email;

    const snapshot = await this.usersRef
      .orderByChild('email')
      .equalTo(loginId)
      .once('child_added');

    return snapshot.val();
  };
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
