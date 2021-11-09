import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Pagination from "@/components/UI/Pagination";
// import axios from "axios";
// jest.setTimeout(10000);
const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const wrapper = shallowMount(Pagination, {
  router,
  localVue,
  propsData: {
    length: 10,
  },
});

describe("Pagination", () => {
  test("setting page by incoming query string", () => {
    // wrapper.setData({ page: 3 });
    // return new Promise((resolve, reject) => {
    //   wrapper.vm.$nextTick(() => {
    //     expect(wrapper.vm).toMatchSnapshot();
    //     var active_btn = wrapper.find("div");
    //     console.log(active_btn.text());
    //     // expect(active_btn.text()).to.be.eql("3");
    //     resolve(true);
    //   });
    // });
  });
});

// axios.post("/test", { a: 1 });
// const wrapper = mount(Pagination);
// expect(wrapper.vm).toBeTruthy();
// expect(true).toBeTruthy();
