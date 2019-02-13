import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        abc1d: {
          title: 'terminar la pildora',
          complete: false
        },
      }
    }
  }
};

import {editPosts } from '../src/lib/firebase/controller-firebase';

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('lista de posts', () => {
  it('Debería porder agregar un post', (done) => {
    return addPost('Feliz Cumpleaños')
      .then(() => getPost(
        (data) => {
          const result = data.find((note) => note.message === 'Feliz Cumpleaños');
          expect(result.message).toBe('');
          done('Feliz Cumpleaños');
        }
      ));
  });
  it('Debería poder eliminar un post', (done) => {
    return deletePost('abc1d')
      .then(() => getPost(
        (data) => {
          const result = data.find((note) => note.id === 'abc1d');
          expect(result).toBe(undefined);
          done();
        }
      ));
  });
});

describe('editPosts', () => {
  it('Debería poder editar posts: Hola Mundo', () => {
    return editPosts() .then()
  });
});