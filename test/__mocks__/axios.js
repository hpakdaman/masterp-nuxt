let url = "";
let body = {};
let mockError = false;

jest.mock("axios", () => ({
  post: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError) throw Error();
      url = _url;
      body = _body;
      if (url == "/api/programs?false") {
        resolve(false);
      }
      resolve(true);
    });
  },
}));
