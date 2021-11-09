<template>
  <!-- <v-card col="12" class="mx-auto"> -->
  <v-row class="sidebar">
    <v-col class="px-4">
      <v-card-title>Filters</v-card-title>
      <!-- <v-card-subtitle>Adjust to find your desire university</v-card-subtitle> -->
      <Degree />
      <DesciplineTree />
      <Location />
      <TuituionFee />
      <Duration />
    </v-col>
  </v-row>
  <!-- </v-card> -->
</template>

<script> 
import Degree from '@/components/Inputs/Degree'
import DesciplineTree from '@/components/Inputs/DesciplineTree'
import Location from '@/components/Inputs/Location'
import TuituionFee from '@/components/Inputs/TuitionFee'
import Duration from '@/components/Inputs/Duration'
export default {
  components: {
    Degree,
    DesciplineTree,
    Location,
    TuituionFee,
    Duration,
  }
}
</script>

<style>
.v-subheader,
.v-slider__tick-label,
.v-slider--horizontal {
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  -khtml-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
</style>