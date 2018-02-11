import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        console.log("nuxtServerInit", context.app);
        return context.app.$axios.get("/posts.json").then(res => {
          const postsArray = [];
          for (const key in res.data) {
            postsArray.push({ ...res.data[key], id: key });
          }
          vuexContext.dispatch("setPosts", postsArray);
        });
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date()
        };
        return this.$axios
          .$post("https://nuxt-blog-cac9b.firebaseio.com/posts.json", createdPost)
          .then(res => vuexContext.commit("addPost", { ...createdPost, id: res.data.name }));
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put("https://nuxt-blog-cac9b.firebaseio.com/posts/" + editedPost.id + ".json", editedPost)
          .then(res => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
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
