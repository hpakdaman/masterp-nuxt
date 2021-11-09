<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="7"
      @input="paginate"
      circle
    ></v-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { url } from '@/plugins/helpers'
export default {
  name: 'Pagination',
  props: {},
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    ...mapState({
      // arrow functions can make the code very succinct!
      length: 'totalPages',
    }),
  },
  mounted() {
    this.getFromQS()
  },
  updated() {
    this.getFromQS()
  },
  methods: {
    getFromQS() {
      this.page = parseInt(this.$route.query.page) || 1;
    },
    paginate() {
      let params = this.$route.query;
      params['page'] = this.page;
      url.push(params).then((params) => {
        this.$store.dispatch('query', params)
      });
    }
  }
}
</script>