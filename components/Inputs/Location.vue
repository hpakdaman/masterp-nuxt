<template>
  <div>
    <v-card-text>
      <v-combobox
        v-model="locations"
        :items="items"
        label="Locations"
        item-text="name"
        item-value="id"
        multiple
        chips
        small-chips
        deletable-chips
      >
        <template v-slot:selection="{ item }">
          <v-badge
            class="mr-5 mt-2 mb-1"
            bordered
            color="info"
            :content="item.id"
            overlap
          >
            <v-btn
              class="white--text"
              @click="removeSelected(item.id)"
              color="info"
              depressed
            >
              {{ item.name }}
            </v-btn>
          </v-badge>
        </template>

        <template v-slot:item="{ item }">
          <v-badge class="mr-5 mt-2 mb-1" :content="item.id" inline>
            {{ item.name }}
          </v-badge>
        </template>
      </v-combobox>
    </v-card-text>
  </div>
</template>

<script> 
import countries from '@/assets/json/countries.json'
import { url } from '@/plugins/helpers'
let _ = require('lodash');

export default {
  data() {
    return {
      dataLoaded: false,
      locations: [],
      items: [],
    }
  },
  mounted() {
    this.items = countries
    if (this.$route.query.locations)
      this.$route.query.locations.split(',').map(id => {
        const item = _.find(this.items, ['id', id])
        this.locations.push({ id, 'name': item ? item.name : '' })
      });

    // by this way we prevent to data being load several time
    this.$nextTick(() => {
      this.dataLoaded = true;
    })
  },
  watch: {
    locations(values) {
      if (!this.dataLoaded)
        return;
      let params = this.$route.query;
      params['page'] = 1
      params['locations'] = _.map(values, 'id').join(',');
      url.push(params).then((params) => {
        this.$store.dispatch('query', params)
      })
    },
  },
  methods: {
    removeSelected(id) {
      this.locations = _.filter(this.locations, item => item.id != id)
    }
  }
}
</script>