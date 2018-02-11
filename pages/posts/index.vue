<template>
  <div class="post-page">
    <PostList :posts="loadedPosts"></PostList>

  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList.vue";

export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  },

  components: {
    PostList
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
