import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api";
let axiosTokens = [];

export const defaultState = {
  programs: [],
  total: null,
  totalPages: null,
  report: {},
};
export const state = () => defaultState;

export const getters = {
  count(state) {
    return state.total || 0;
  },
  count_formatted(state, getters) {
    return getters.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  report_disciplines: (state) => (id) => {
    if (typeof state.report.byDisciplines != "undefined") {
      const found = state.report.byDisciplines.find(
        (item) => parseInt(item._id) == parseInt(id)
      );
      return found ? found.count : "0";
    }
    return "0";
  },
  report_locations: (state) => (id) => {
    if (typeof state.report.byCountry != "undefined") {
      const found = state.report.byCountry.find(
        (item) => parseInt(item._id) == parseInt(id)
      );
      return found ? found.count : "0";
    }
    return "0";
  },
};

export const mutations = {
  appendProgram(state, programs) {
    programs.forEach((item) => state.programs.push(item));
  },
  updatePrograms(state, programs) {
    state.programs = programs;
  },
  updateMeta(state, meta) {
    state.total = meta.total;
    state.totalPages = meta.totalPages;
  },
  updateReport(state, reports) {
    state.report = reports;
  },
  resetDefault(state, reports) {
    Object.keys(defaultState).map((k) => (state[k] = defaultState[k]));
    // defaultState
    // state = { ...defaultState };
  },
};

import { arr, url } from "@/plugins/helpers";
export const actions = {
  async nuxtServerInit({ dispatch }, { query }) {
    axios.defaults.baseURL = "http://localhost:3000/api";
    return await dispatch("query", query);
  },

  async query(ctx, params) {
    params = arr.only(params, [
      "page",
      "degree",
      "disciplines",
      "locations",
      "tuition",
      "duration",
    ]);
    if (axiosTokens.length) {
      // cancel last running requests
      axiosTokens.forEach((source) => source.cancel());
    }

    // Axios Cancel Token
    let source;
    axiosTokens.push((source = axios.CancelToken.source()));
    try {
      const result = await axios.get("/programs/?" + url.toQuery(params), {
        cancelToken: source.token,
      });
      // console.log(result);
      if (result.status == 200 && result.data) {
        ctx.commit("updateMeta", result.data.meta);
        ctx.commit("updatePrograms", result.data.data);
        ctx.commit("updateReport", result.data.report);
        return result.data.meta;
      }
      throw Error();
    } catch (e) {
      console.log("[resetDefault]");
      ctx.commit("resetDefault");
    }
  },
};
