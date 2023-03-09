<template>
  <Layout>
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="text-md-center">
            <h2 class="my-4">Blog Posts</h2>
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

