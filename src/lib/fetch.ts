import axios from "axios";
import config from "../../config";

const options = {
  // headers: { 'X-Requested-With': 'XMLHttpRequest' },
};

const MethodArray = ["post", "get", "options"];

const ajax = method => (url, body, opts = options) => {
  return axios({
    method,
    url: `${config.api}/${url}`,
    data: body,
    params: body,
    ...opts
  })
    .then(res => {
      const { status } = res;
      const result = res.data;
      const { success, data, code, msg } = result;

      if (!success || code == -1) {
        return Promise.reject(msg);
      }
      return Promise[["reject", "resolve"][+(200 <= status && status < 400)]](
        data
      );
    })
    .catch(err => {
      console.log(err, "=========== err happened ========");
      throw err;
    });
};

let request = (method, url, body, opts = options) => {
  return ajax(method)(url, body, opts);
};

MethodArray.forEach(method => {
  request[method] = ajax(method);
});

export { request };
