import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit('setPosts', [
              {
                id: '1',
                title: 'first Post',
                previewText: 'This is our first Post',
                thumbnail: 'http://www.biznespreneur.com/wp-content/uploads/2017/06/t.jpg'
              },
              {
                id: '2',
                title: 'My Awesome post',
                previewText: 'Super Amazing',
                thumbnail: 'https://i.ytimg.com/vi/dbquWKd2pMY/maxresdefault.jpg'
              }
            ]);
            resolve();
          }, 2000);
        });
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
