<template>
  <v-container justify="left pl-13">
    <v-breadcrumbs :items="items"></v-breadcrumbs>
  </v-container>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
