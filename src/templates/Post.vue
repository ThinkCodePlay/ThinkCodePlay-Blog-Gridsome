<template>
  <Layout>
    <div v-html="$page.post.content"></div>
  </Layout>
</template>

<page-query>
query Post ($path: String){
 post: post(path: $path) {
   date
   content
   title
 }
}
</page-query>

<script>
export default {
  name: "Post",
  metaInfo() {
    return {
      title: this.$page.post.title
    };
  }
}
</script>

<style scoped>

</style>