<template>
  <div class="col-md-4 post-card">
    <g-link
      :title="title"
      :to="link"
      class="black font-weight-normal no-underline"
    >
      <g-image
        :src="image"
        :alt="title"
        class="img-fluid rounded border mb-3"
      />
      <h4>{{ title }}</h4>
      <!-- <p class="small">{{ description.slice(0,200) }}</p> -->
    </g-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.post-card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  padding: 1rem;
  transition: 0.2s ease;
}

.post-card:hover {
  transform: translateY(5px);
}

.post-card a:hover {
  text-shadow: none;
  box-shadow: none;
}

h4, .h4 {
    font-size: 1.25rem;
    font-family: 'Poppins', Futura, Trebuchet MS, Arial Black, Arial Bold, Arial, sans-serif;
    font-weight: 800;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 0.5rem;
}

/* h4 {
  font-family: Futura, Trebuchet MS, Arial Black, Arial Bold, Arial, sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  margin-top: 0;
} */

.no-underline {
  text-decoration: none!important
}

.black {
    color: #393e42 !important;
    text-decoration: none !important;
  }
</style>
