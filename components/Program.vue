<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="mb-5"
      :elevation="hover ? 8 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-card-title
        class="subtitle-1 font-weight-medium"
        style="display: block"
      >
        <v-row>
          <v-col cols="10">
            <nuxt-link class="program-link" :to="'/program/' + program._id">
              <span class="text-h6 blue--text">{{ program.title }}</span>
            </nuxt-link>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-right">
            <v-icon color="pink lighten-3">mdi-heart</v-icon>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text class="card-body">
        <v-row justify="space-between">
          <v-col lg="9" md="8">
            <ExpandMore>
              {{ program.summary }}
            </ExpandMore>

            <p class="props font-weight-light mb-0">
              {{ program.degree_formatted }}
              <i>/</i> {{ density_formatted }} <i>/</i> {{ methods_formatted }}
            </p>
          </v-col>

          <v-col lg="3" md="4" sm="4">
            <span class="tuition-value font-weight-medium"
              >{{ tuition_formatted }} USD / year</span
            >

            <v-chip
              v-if="program.duration.trim()"
              class="blue-grey mt-2 lighten-5"
              small
            >
              <v-icon small left> mdi-alarm-check </v-icon>
              {{ program.duration }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col cols="1" align-self="center">
            <v-img
              v-if="program.logo"
              :src="program.logo"
              max-width="40"
              max-height="40"
            ></v-img>
            <v-icon v-else large>mdi-bank</v-icon>
          </v-col>
          <v-col>
            <span class="font-weight-light text-body-2">{{
              program.organisation
            }}</span>
            <br />
            <span class="font-weight-light text-caption">{{
              program.countries_formated
            }}</span>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import ExpandMore from '@/components/UI/ExpandMore'
export default {
  components: {
    ExpandMore
  },
  props: {
    program: {
      type: Object,
      required: true
    }
  },
  computed: {
    density_formatted: function () {
      var newVal = ''
      var sep = ''
      this.program.density.split(',').forEach(str => {
        if (str == 'fulltime') {
          newVal += sep + 'Full Time';
          sep = ', '
        }
        if (str == 'parttime') {
          newVal += sep + 'Part Time';
          sep = ', '
        }
      });
      return newVal;
    },
    methods_formatted: function () {
      var newVal = ''
      var sep = ''
      this.program.methods.split(',').forEach(str => {
        if (str == 'face2face') {
          newVal += sep + 'On Campus';
          sep = ', '
        }
        if (str == 'online') {
          newVal += sep + 'Online';
          sep = ', '
        }
      });
      return newVal;
    },
    tuition_formatted: function () {
      return this.program.tuition_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }
}
</script> 

<style scoped>
.v-list {
  background: none;
}

.card-body {
  position: relative;
  padding-bottom: 35px;
}
.props {
  position: absolute;
  bottom: 10px;
}
.props i {
  color: rgb(255, 166, 0);
  margin: 0 3px;
}
a.program-link {
  text-decoration: none;
}
</style>