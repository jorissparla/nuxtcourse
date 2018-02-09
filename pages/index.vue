<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news</h1>
    </section>
    <section class="featured-posts">
      <PostList :posts="loadedPosts"></PostList>

      

    </section>
    
    </div>
</template>

<script>
import PostList from '~/components/Posts/PostList.vue';

export default {
  components: {
    PostList
  },
  asyncData(context, callback) {
    console.log('Async Data is executed');
    setTimeout(() => {
      callback(null, {
        loadedPosts: [
          {
            id: '1',
            title: 'first Post',
            previewText: 'This is our first Post',
            thumbnail: 'http://www.biznespreneur.com/wp-content/uploads/2017/06/t.jpg'
          },
          {
            id: '2',
            title: 'Second Post',
            previewText: 'This is our first Post',
            thumbnail:
              'https://media-exp2.licdn.com/mpr/mpr/AAIABADGAAoAAQAAAAAAAA0AAAAAJDU5Y2Q1Mjk1LTAxOWUtNDY3My1hMDg1LTBmMmZkYjVkOTEzOQ.jpg'
          },
          {
            id: '3',
            title: 'first Post',
            previewText: 'This is our first Post',
            thumbnail:
              'https://thetechportal.com/wp-content/uploads/2017/07/wire-rack-1311161_960_720-300x168.jpg'
          }
        ]
      });
    }, 1500);
  },
  created() {}
  /*   data() {
    return {
      loadedPosts: []
    };
  } */
};
</script>

<style>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~/assets/main-page-background.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  font-weight: 100;
  color: white;
  background-color: rgb(44, 139, 216);
  padding: 10px;
  border-radius: 2px;
  box-shadow: 1px 1px 1px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>


