// configurando firebase mock
const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc1d: {        
          email: 'toxoloc@parcel4.net',    
          password: '123456nat'
        },
      }
    }
  }
};

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockdatabase.child(path) : null),
  () => mockauth,
  () => mockfirestore
);

// importamos la funcion que vamos a testear
import { signInUser, loginAuth, closeSignIn, signUpUser } from '../src/lib/firebase/controller-auth-login.js';

 describe('loginAuth', () => {
  it('Debería ser una función', () => {
    expect(typeof loginAuth).toBe('function');
  });

  it('Debería poder actualizar el nombre del usuario', () => {
    signInUser('gatitosbonitos@gmail.com', '123456').then(() => {
      return loginAuth();
    });
  });
});

describe('signUpUser', () => {
  it('debería ser una función', () => {
    expect(typeof signUpUser).toBe('function');
  });
  it('Debería poder registrar a un usuario', () => {
    return signUpUser('toxoloc@parcel4.net', '123456nat');
  });
});
