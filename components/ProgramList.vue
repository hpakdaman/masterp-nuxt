<template>
  <v-sheet>
    <h2>Available Programs</h2>
    <v-card-subtitle class="font-weight-thin" color="gray">
      {{ count_formatted }} Results
    </v-card-subtitle>
    <!-- <v-col>
      <v-btn @click="query({ page: 1 })">Load</v-btn>
    </v-col> -->

    <Program v-for="program in programs" :key="program.d" :program="program" />

    <div class="mt-15">
      <pagination />
    </div>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Program from '@/components/Program'
import Pagination from './UI/Pagination'
export default {
  components: {
    Program,
    Pagination,
  },
  computed: {
    ...mapState([
      'programs'
    ]),
    ...mapGetters([
      'count_formatted'
    ])
  },
  methods: {
    ...mapActions(['query']),
  },
  mounted() {
    // this.query({ page: 1 })
  }
}
</script> 

<style scoped>
.v-list {
  background: none;
}
</style>