import MockFirebase from 'mock-cloud-firestore';
import { editPosts, getPosts } from '../src/lib/firebase/controller-auth-login';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc1d: {
          content: 'Hola a todos',
          date: '13 de febrero de 2019, 18:54:36 UTC-5',
          name: 'Micaela Suarez',
          likes: 0,
          privacy: 'Público',
          uid: '79wGxqkdsAbUhMcIRd68W0SPsui2'
        },
      }
    }
  }
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('lista de posts', () => {
  it('Debería poder editar post', (done) => {
    return editPosts('abc1d', 'Feliz Cumpleaños')
      .then(() => getPosts((data) => {
        console.log(data);
        const result = data.find((post) => post.content === 'Feliz Cumpleaños');
        expect(result.content).toBe('Feliz Cumpleaños');
        done();
      }
      ));
  });
});