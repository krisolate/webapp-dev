<template>
  <main class="home-page">
    <div class="home-layout">
      <aside class="side-panel" aria-label="Left sidebar"></aside>

      <section class="posts" aria-label="Posts">
        <Post v-for="post in posts" :key="post.id" :post-id="post.id" />
      </section>

      <aside class="side-panel" aria-label="Right sidebar"></aside>
    </div>

    <div class="reset-likes-container">
      <button class="primary-button" type="button" @click="resetLikes">
        Reset all likes
      </button>
    </div>
  </main>
</template>

<script>
import Post from "../components/Post.vue";

export default {
  components: {
    Post,
  },

  computed: {
    posts() {
      return this.$store.getters.allPosts;
    },
  },

  methods: {
    resetLikes() {
      this.$store.commit("resetLikes");
    },
  },

  mounted() {
    if (this.posts.length === 0) {
      this.$store.dispatch("loadPosts");
    }
  },
};
</script>
