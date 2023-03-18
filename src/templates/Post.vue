<template>
  <Layout>
    <section class="py-5">
      <div class="container">
        <h1 style="text-align: center">{{$page.post.title}}</h1>
        <g-image
          :src="$page.post.cover"
          :alt="$page.post.title"
          class="img-fluid rounded border mb-5"
        />
        <div class="markdown" v-html="$page.post.content"></div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query Post ($path: String){
 post: post(path: $path) {
   date
   content
   title
   cover
 }
}
</page-query>

<script>
export default {
  name: "Post",
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
};
</script>

<style>
  h1,
  h2,
  h3,
  h4 {
    font-family: "Poppins", Futura, Trebuchet MS, Arial Black, Arial Bold, Arial,
      sans-serif;
    font-weight: 800;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  body {
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
      Helvetica, Arial, "Lucida Grande", sans-serif;
    font-size: 1.15rem;
    font-weight: 400;
    line-height: 1.5;
    color: #393e42;
    text-align: left;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
    position: relative;
    text-rendering: optimizelegibility;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: "liga";
    min-height: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  a {
    color: #ff3399;
    text-decoration: underline;
    font-weight: 800;
    transition: 0.2s ease;
  }

  a:hover {
    color: #ff3399;
    text-shadow: 0 0 10px #ff3399;
  }

  .g-image {
    display: block;
    margin: 0 auto;
  }
</style>
