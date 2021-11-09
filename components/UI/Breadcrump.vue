<template>
  <div justify="left pl-13">
    <v-breadcrumbs :items="items"></v-breadcrumbs>
  </div>
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
