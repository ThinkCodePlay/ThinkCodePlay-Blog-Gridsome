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
          <post-card
            link="https://www.moneylab.co/profitable-niche/"
            title="Discover a Profitable Niche In Under 5 Minutes (Without Research)"
            image="https://www.moneylab.co/wp-content/uploads/Profitable-Niche-No-Border.jpg"
            description="What's the best way to discover a profitable niche? This 5-step analog method will uncover the perfect niche to start your business around."
          />
          <post-card
            link="https://www.moneylab.co/twenty-two/"
            title="My 2022 Annual Online Business Review"
            image="https://www.moneylab.co/wp-content/uploads/2022-Annual-Online-Business-Review.jpg"
            description="I officially have a million-dollar business. In 2023, I'm dedicating 80% of time to producing free content to grow traffic. Let's pour gas on this fire!"
          />
          <post-card
            link="https://www.moneylab.co/sexy-boring/"
            title="3 Boring Business Tasks That Bring Sexy Results"
            image="https://www.moneylab.co/wp-content/uploads/3-Boring-Business-Tasks-That-Bring-Sexy-Results.png"
            description="I promise these tasks will save your business from ever failing. And help add more revenue to your bottom line."
          />
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
