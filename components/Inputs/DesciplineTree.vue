<template>
  <div>
    <v-card-text>
      <v-row>
        <v-subheader
          :class="{ 'blue--text': selection.length }"
          @click="moveTemp"
          >Disciplines</v-subheader
        ></v-row
      >
      <v-treeview
        v-model="selection"
        :items="items"
        selection-type="leaf"
        selectable
        return-object
        dense
      >
        <template v-slot:prepend="{ item }">
          <Icon :name="item.icon" v-if="item.icon" :size="50" color="#5096ec" />
        </template>
      </v-treeview>
    </v-card-text>
  </div>
</template>

<script>
import disciplines from '@/assets/json/disciplines.json'
import { url } from '@/plugins/helpers'
let _ = require('lodash');
let tempData = []
export default {
  data: () => ({
    dataLoaded: false,
    selection: [],
    items: [],
  }),
  mounted() {
    this.items = disciplines;
    if (this.$route.query.disciplines) {
      this.$route.query.disciplines.split(',').map(id => {
        this.selection.push({ name: '', id })
      });
    }
    // by this way we prevent to data being load several time
    this.$nextTick(() => {
      this.dataLoaded = true;
    })
  },
  watch: {
    selection(values) {
      if (!this.dataLoaded)
        return;
      let params = this.$route.query;
      params['page'] = 1
      params['disciplines'] = _.map(values, 'id').join(',');
      url.push(params).then((params) => {
        this.$store.dispatch("query", params)
      })
    }
  },
  methods: {
    moveTemp() {
      if (this.selection.length) {
        tempData = this.selection.slice(0);
        this.selection = []
      }
      else {
        this.selection = tempData.slice(0)
        tempData = []
      }
    },
  }
}
</script>

<style scoped>
.v-subheader {
  cursor: pointer;
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  -khtml-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
</style>