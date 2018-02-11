import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
      email: ""
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
      },
      setToken(state, { token, email }) {
        state.token = token;
        state.email = email;
      },
      clearToken(state) {
        console.log("clearToken");
        state.token = null;
        state.email = "";
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
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
          .post("/posts.json?auth=" + vuexContext.state.token, createdPost)
          .then(data => vuexContext.commit("addPost", { ...createdPost, id: data.name }));
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .put("/posts/" + editedPost.id + ".json?auth=" + vuexContext.state.token, editedPost)
          .then(res => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      authenticateUser(vuexContext, { isLogin, email, password }) {
        let authURL = isLogin
          ? "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + process.env.fbAPIKey
          : "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + process.env.fbAPIKey;
        return this.$axios
          .$post(authURL, { email, password: password, returnSecureToken: true })
          .then(result => {
            vuexContext.commit("setToken", result.idToken, email);
            localStorage.setItem("token", result.idToken);
            Cookie.set("jwt", result.idToken);
            localStorage.setItem("email", email);
            Cookie.set("email", email);
            localStorage.setItem("tokenExpiration", new Date().getTime() + parseInt(result.expiresIn * 1000));
            Cookie.set("tokenExpiration", new Date().getTime() + parseInt(result.expiresIn * 1000));
            //vuexContext.dispatch("setLogoutTimer", result.expiresIn * 1000);
          })
          .catch(e => console.log(e));
      },
      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit("clearToken");
        }, duration);
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        let email;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("tokenExpiration="))
            .split("=")[1];
          email = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("email="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          email = localStorage.getItem("email");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", { token, email });
      },
      logout(vuexContext, req) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("email");
        Cookie.remove("tokenExpiration");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      },
      loggedOnUser(state) {
        return state.email;
      }
    }
  });
};

export default createStore;
