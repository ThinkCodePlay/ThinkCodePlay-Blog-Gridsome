<template>
  <div class="col-md-4 post-card">
    
    <g-link
      :title="title"
      :to="link"
      class="black font-weight-normal no-underline"
    >
      <g-image :src="image" :alt="title" class="img-fluid rounded border mb-3" />
      <h4>{{ title }}</h4>
      <p class="small">{{ description.slice(0,200) }}</p>
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
