<template>
  <v-col>
    <v-select
      :items="items"
      label="Degree"
      item-text="title"
      item-value="val"
      v-model="degree"
      @input="change"
      solo
    ></v-select>
  </v-col>
</template>
<script>
import { url } from '@/plugins/helpers'
export default {
  data: () => ({
    degree: null,
    items: [
      {
        title: 'M.Sc. Master of Science',
        val: 'msc'
      },
      {
        title: 'M.A. Master of Arts',
        val: 'ma'
      },
      {
        title: 'M.B.A. Master of Business Administration',
        val: 'mba'
      },
      {
        title: 'LL.M. Master of Laws',
        val: 'llm'
      },
      {
        title: 'M.Phil. Master of Philosophy',
        val: 'mphil'
      },
      {
        title: 'M.Litt. Master of Letters',
        val: 'mlitt'
      },
      {
        title: 'M.Res. Master of Research',
        val: 'mres'
      },
      {
        title: 'M.Eng. Master of Engineering',
        val: 'meng'
      },
      {
        title: 'Postgraduate Diploma',
        val: 'postgraddip'
      },
      {
        title: 'Postgraduate Certificate',
        val: 'postgradcert'
      },
      {
        title: 'Pre-Master',
        val: 'premaster'
      },
    ]
  }),
  mounted() {
    this.degree = this.$route.query.degree;
  },
  methods: {
    change() {
      let params = this.$route.query;
      params['page'] = 1
      params['degree'] = this.degree;
      url.push(params).then((params) => {
        this.$store.dispatch('query', params)
      })
    },
  }
}
</script>