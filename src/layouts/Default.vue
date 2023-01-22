<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
export default {
  components: {
    Footer,
    Header,
  },
};
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style></style>
