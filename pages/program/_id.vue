<template>
  <v-sheet>
    <Breadcrump :items="breadcrumbs" />
    <v-container>
      <v-col lg="6" md="8" sm="8" xs="12">
        <h4 class="text-subtitle-1">
          {{ program.organisation }}
        </h4>
        <h2>{{ program.title }}</h2>
        <v-btn
          color="success mt-3"
          elevation="3"
          large
          block
          :href="program.url"
          target="_blank"
        >
          <v-icon right dark> mdi-link </v-icon> &nbsp;&nbsp;
          <span>University official website</span>
        </v-btn>
      </v-col>

      <v-container>
        <v-card class="mt-10">
          <v-card-text>
            <v-row>
              <v-col md="3">
                <div class="text-center mx-auto" style="max-width: 120px">
                  <v-icon>lnr-clock3</v-icon>
                  <b class="text-subtitle">{{ program.duration }}</b>
                  <br />
                  <span class="text-caption">Duration</span>
                </div>
              </v-col>
              <v-col md="3">
                <div class="text-center mx-auto" style="max-width: 120px">
                  <v-icon>lnr-bag-coins</v-icon>
                  <b class="text-subtitle">${{ tuition_formatted }}</b>
                  <b class="text-caption">Year</b>
                  <br />
                  <span class="text-caption">Tuition fee</span>
                </div>
              </v-col>
              <v-col md="3">
                <div class="text-center mx-auto" style="max-width: 120px">
                  <v-icon>lnr-map-marker</v-icon>
                  <b class="text-subtitle">{{ program.countries_formated }}</b>
                  <br />
                  <span class="text-caption">Location</span>
                </div>
              </v-col>
              <v-col md="3">
                <div class="text-center mx-auto" style="max-width: 120px">
                  <v-icon>lnr-earth</v-icon>
                  <b class="text-subtitle">{{ density_formatted }}</b>
                  <br />
                  <span class="text-caption">Language</span>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>

      <v-div class="mt-5 text-body">
        <v-card-text>
          <strong class="text-h5">About</strong>
          <p class="mt-3">
            {{ program.summary }}
          </p>
        </v-card-text>
      </v-div>

      <v-container class="text-body">
        <v-card class="mt-5">
          <v-toolbar flat color="primary" dark>
            <v-toolbar-title>Information</v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical>
            <v-tab>
              <v-icon left> mdi-account </v-icon>
              Program
            </v-tab>
            <v-tab>
              <v-icon left> mdi-lock </v-icon>
              Requirements
            </v-tab>
            <v-tab>
              <v-icon left> mdi-access-point </v-icon>
              Program Structure
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-card max-width="300" class="mb-10" tile>
                    <v-list dense>
                      <v-subheader>Language Proficiencies</v-subheader>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-img
                            :src="`/img/ielts-200.jpg`"
                            width="30"
                            max-height="20"
                            max-width="30"
                          ></v-img>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            >IELTS : {{ program.ielts }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-icon>
                          <v-img
                            :src="`/img/toefl-200.png`"
                            width="30"
                            max-height="20"
                            max-width="30"
                          ></v-img>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            >TOEFL :
                            {{ program.toefl_internet }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>

                  <v-row>
                    <v-col cols="1" align-self="center">
                      <v-img
                        v-if="program.logo"
                        :src="program.logo"
                        max-width="40"
                        max-height="40"
                      ></v-img>
                      <v-icon v-else large>mdi-clock-time-three-outline</v-icon>
                    </v-col>
                    <v-col>
                      <span class="font-weight-light text-body-2">
                        <span
                          v-html="program.start.split(' -').join('<br/>')"
                        ></span>
                      </span>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="1" align-self="center">
                      <v-img
                        v-if="program.logo"
                        :src="program.logo"
                        max-width="40"
                        max-height="40"
                      ></v-img>
                      <v-icon v-else large>mdi-check-decagram-outline</v-icon>
                    </v-col>
                    <v-col>
                      <span class="font-weight-light text-body-2">
                        {{ program.ects_credits }}
                      </span>
                      <br />
                      <span class="font-weight-light text-caption">Credit</span>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="1" align-self="center">
                      <v-icon large>mdi-bank</v-icon>
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
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p v-html="program.contents"></p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p v-html="program.requirements"></p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-container>
    </v-container>
  </v-sheet>
</template> 

<script> 
import Breadcrump from '@/components/UI/Breadcrump'
import axios from "axios";
export default {
  components: {
    Breadcrump,
  },
  data() {
    return {
      program: {},
      breadcrumbs: []
    }
  },
  async asyncData({ route }) {
    const result = await axios.get(`/program/${route.params.id}`);
    if (result.status == 200)
      return {
        program: result.data,
        breadcrumbs: [
          {
            disabled: false,
            href: '/',
            link: true,
            text: 'Homepage',
          },
          {
            disabled: false, 
            link: false,
            text: result.data.organisation,
          },
          {
            disabled: false, 
            link: false,
            text: result.data.title,
          }
        ]
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