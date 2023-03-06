<template>
  <Layout>
    <section class="py-5">
      <div class="container">
        <div class="row align-items-end">
          <div class="col-md text-left text-md-center">
            <h2 class="mb-0">Latest</h2>
          </div>
          <div class="col-md text-right text-md-center">
            <a href="/posts/">Explore more →</a>
          </div>
        </div>

        <div class="row">
          <PostCard
            v-for="(post, index) in $page.allPost.edges.slice(0,3)"
            :key="index"
            :title="post.node.title"
            :image="'https://thinkcodeplay.com/wp-content/uploads/2022/02/5-1024x536.png'"
            :description="post.node.content"
            :link="post.node.path"
          >
          </PostCard>
        </div>
        <hr />
        <div class="row">
          <div class="text-md-center">
            <h2 class="mb-0">Blog Posts</h2>
          </div>
        </div>
        <div class="row">
          <PostCard
            v-for="(post, index) in $page.allPost.edges"
            :key="index"
            :title="post.node.title"
            :image="post.node.cover"
            :description="post.node.content"
            :link="post.node.path"
          >
          </PostCard>
        </div>
      </div>
    </section>
  </Layout>
</template>

<!-- get all posts from query -->
<page-query>
query {
  allPost {
    edges {
      node {
        path
        title
        date
        content
        cover
      }
    }
  }
}
</page-query>

<script>
import PostCard from "../components/PostCard.vue";
export default {
  components: {
    PostCard,
  },
  metaInfo: {
    title: "Hello, world!",
  },
};
</script>
