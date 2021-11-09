<template>
  <div>
    <v-card-text>
      <v-row> <v-subheader>Tuition Fee (USD)</v-subheader></v-row>
      <v-range-slider
        v-model="tuition"
        :max="max"
        :min="min"
        step="100"
        hide-details
        class="align-center"
        @end="change"
      >
        <template v-slot:prepend>
          <v-text-field
            :value="tuition[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="text"
            style="width: 70px"
            dense
            outlined
            @change="$set(tuition, 0, $event)"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            :value="tuition[1]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="text"
            style="width: 70px"
            dense
            outlined
            @change="$set(tuition, 1, $event)"
          ></v-text-field>
        </template>
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
      tuition: [0, 5000],
    }
  },
  mounted() {
    if (this.$route.query.tuition) {
      this.tuition = this.$route.query.tuition.split(',');
    }
    this.$nextTick(() => this.dataLoaded = true)
  },
  methods: {
    change() {
      if (!this.dataLoaded)
        return false;
      let params = this.$route.query;
      params['page'] = 1
      params['tuition'] = this.tuition.join(',');
      url.push(params).then((params) => {
        this.$store.dispatch('query', params)
      })
    },
  }
}
</script>