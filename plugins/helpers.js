/*
 Url Helpers
 */
export const url = {
  toQuery(params) {
    //const rand = Math.floor(Math.random() * 100000000 + 99999999);
    return Object.keys(params)
      .map((k) => `${k}=${params[k]}`)
      .join("&");
    // + "#!"
    // + rand
  },
  push(params) {
    return new Promise((resolve, reject) => {
      // filter some empty query parameter
      const filtered = obj.filter(params, (v, k) => v.toString().trim());
      // because of jumping up issue when no longer us Vue router
      // this.$router.push('?' + helper.toQuery(params))
      history.pushState({}, "", `?${url.toQuery(filtered)}`);
      setTimeout(() => resolve(filtered), 500);
    });
  },
};

/*
 Array Helpers
 */
export const arr = {
  only(params, only) {
    let out = {};
    Object.keys(params).map((k) => {
      if (only.includes(k)) out[k] = params[k];
    });
    return out;
  },
};

/*
 Object Helpers
 */
export const obj = {
  filter(obj, callback) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, val]) => callback(val, key))
    );
  },
};
