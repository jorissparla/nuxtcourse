<template>
  <div class="post-page">
    <PostList :posts="loadedPosts"></PostList>

  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList.vue';

export default {
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPosts: [
          {
            id: '1',
            title: 'first Post',
            previewText: 'This is our first Post',
            thumbnail: 'http://www.biznespreneur.com/wp-content/uploads/2017/06/t.jpg'
          }
        ]
      });
    }, 2000);
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
