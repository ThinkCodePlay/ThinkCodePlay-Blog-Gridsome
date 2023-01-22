<template>
  <div class="col-md-4 post-card">
    <a
      :href="link"
      :title="title"
      class="black font-weight-normal no-underline"
    >
      <img :src="image" :alt="title" class="img-fluid rounded border mb-3" />
      <h4>{{ title }}</h4>
      <p class="small">{{ description }}</p>
    </a>
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
