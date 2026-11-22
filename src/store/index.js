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
      let data;

      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/krisolate/webapp-dev/posts",
        );

        if (!response.ok) {
          throw new Error(`Online API returned ${response.status}`);
        }

        data = await response.json();
      } catch (error) {
        console.warn("Online API unavailable, loading local posts:", error);

        try {
          const response = await fetch(`${import.meta.env.BASE_URL}posts.json`);

          if (!response.ok) {
            throw new Error(`Local JSON returned ${response.status}`);
          }

          data = await response.json();
        } catch (fallbackError) {
          console.error("Could not load posts:", fallbackError);
          return;
        }
      }

      // Support both an array and an object containing a posts array.
      const posts = Array.isArray(data) ? data : data.posts;

      if (!Array.isArray(posts)) {
        console.error("Invalid posts JSON structure:", data);
        return;
      }

      const postsWithLikes = posts.map((post) => ({
        ...post,
        likes: 0,
      }));

      commit("setPosts", postsWithLikes);
    },
  },

  getters: {
    allPosts: (state) => state.posts,
  },
});
