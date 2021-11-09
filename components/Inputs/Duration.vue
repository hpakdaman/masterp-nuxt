<template>
  <div>
    <v-card-text>
      <v-row> <v-subheader>Duration (Year)</v-subheader></v-row>
      <v-range-slider
        v-model="duration"
        :tick-labels="ticksLabels"
        :max="3"
        step="1"
        ticks="always"
        tick-size="4"
        @input="change"
      >
      </v-range-slider>
    </v-card-text>
  </div>
</template>

<script>
import { url } from '@/plugins/helpers'

export default {
  data() {
    return {
      dataLoaded: false,
      min: 0,
      max: 40000,
      duration: [0, 4],
      ticksLabels: [
        '0 ',
        '1',
        '2',
        '3+',
      ],
    }
  },
  mounted() {
    if (this.$route.query.duration) {
      this.duration = this.$route.query.duration.split(',');
    }
    this.$nextTick(() => this.dataLoaded = true)
  },
  methods: {
    change() {
      if (!this.dataLoaded)
        return false;
      let params = this.$route.query;
      params['page'] = 1
      params['duration'] = this.duration.join(',');
      url.push(params).then((params) => {
        this.$store.dispatch('query', params)
      })
    },
  }
}
</script>
