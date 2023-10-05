<template>
  <section>
    <base-card>
      <h2>Page Not Found</h2>
      <p>Go back to the main page?</p>
      <base-button @click="backToMainPage">Back</base-button>
    </base-card>
  </section>
</template>

<script>
export default {
  methods: {
    backToMainPage() {
      this.$router.replace("/coaches");
    }
  }
};
</script>
