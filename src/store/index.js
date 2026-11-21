import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },

    incrementLikes(state, postId) {
      const post = state.posts.find((post) => post.id === postId);

      if (post) {
        post.likes++;
      }
    },

    resetLikes(state) {
      state.posts.forEach((post) => {
        post.likes = 0;
      });
    },
  },

  actions: {
    async loadPosts({ commit }) {
      try {
        const response = await fetch("/posts.json");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        const posts = data.posts.map((post) => ({
          ...post,
          likes: 0,
        }));

        commit("setPosts", posts);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    },
  },

  getters: {
    allPosts: (state) => state.posts,
  },
});
