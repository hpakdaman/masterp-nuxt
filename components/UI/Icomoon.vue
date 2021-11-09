<template>
  <i :class="icon_name"></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      icon_name: this.name
    }
  }
}
</script>