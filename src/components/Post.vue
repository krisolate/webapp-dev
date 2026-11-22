<template>
  <article v-if="post" class="post">
    <div class="post-meta">
      <div class="post-author">
        <img class="small-avatar" :src="avatarUrl" alt="Anonymous avatar" />

        <span>{{ post.authorName }}</span>
      </div>

      <time :datetime="post.createdAt">
        {{ formattedDate }}
      </time>
    </div>

    <img
      v-if="post.imageUrl"
      class="post-image"
      :src="postImageUrl"
      :alt="'Image attached to post by ' + post.authorName"
      loading="lazy"
    />

    <p class="post-body">
      {{ post.content }}
    </p>

    <div class="post-actions">
      <button
        class="like-button"
        type="button"
        :aria-label="'Like post. Current likes: ' + post.likes"
        @click="likePost"
      >
        👍 {{ post.likes }}
      </button>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    post() {
      return this.$store.state.posts.find((post) => post.id === this.postId);
    },

    formattedDate() {
      if (!this.post) return "";

      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(this.post.createdAt));
    },

    postImageUrl() {
      if (!this.post?.imageUrl) return "";

      const imagePath = this.post.imageUrl.replace(/^\.?\//, "");

      return `${import.meta.env.BASE_URL}${imagePath}`;
    },

    avatarUrl() {
      return `${import.meta.env.BASE_URL}images/anon.png`;
    },
  },

  methods: {
    likePost() {
      this.$store.commit("incrementLikes", this.postId);
    },
  },
};
</script>
