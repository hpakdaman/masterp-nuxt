<template>
  <v-sheet>
    <Breadcrump :items="breadcrumbs" />
    <v-row>
      <v-col lg="4" md="4" sm="12" xs="12">
        <Sidebar />
      </v-col>

      <v-col lg="8" md="8" sm="12" xs="12">
        <v-container>
          <ProgramList />
        </v-container>
      </v-col>
    </v-row>
  </v-sheet>
</template>


<script>
import Sidebar from "@/components/Sidebar"
import ProgramList from "@/components/ProgramList"
import Breadcrump from '@/components/UI/Breadcrump'

export default {
  components: {
    Sidebar,
    ProgramList,
    Breadcrump,
  },
  data() {
    return {
      breadcrumbs: [
        {
          disabled: false,
          href: '/',
          link: true,
          text: 'Homepage',
        },
        {
          disabled: false,
          href: '/',
          link: true,
          text: 'Universities',
        }
      ]
    }
  }
}
</script>