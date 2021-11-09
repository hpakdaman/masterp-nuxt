<template>
  <div
    :class="['text-justify', { expanded: expanded }]"
    @click="expanded = !expanded"
    :style="{ 'max-height': maxHeight }"
  >
    <v-icon medium class="toggle-btn">
      {{ !expanded ? "mdi-chevron-down" : "mdi-chevron-up" }}
    </v-icon>

    <slot></slot>
  </div>
</template>

<script> 
export default {
  props: {
    min: {
      type: Number,
      default: 20
    },
    max: {
      type: Number,
      default: 70
    }
  },
  data() {
    return {
      expanded: false,
    }
  },
  computed: {
    maxHeight: function () {
      if (this.expanded)
        return this.max + 'px'
      return this.min + 'px'

    }
  }
}
</script>

<style scoped>
div {
  position: relative;
  transition: max-height 0.25s ease-out;
  overflow: hidden;
  padding-right: 25px;
  text-overflow: ellipsis;
}

div.expanded {
  transition: max-height 0.25s ease-in;
}
.toggle-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 2px;
}
</style>