class HttpRequest {
  constructor() {
    this.xhr = new XMLHttpRequest();
    this.url = "https://api.github.com";
  }

  async get(params) {
    const { data, status } = await this.send({
      method: "get",
      params,
    });

    return {
      data,
      status,
    };
  }

  async post(params, body = {}) {
    const { data, status } = await this.send({
      method: "post",
      params,
      body: body,
    });

    return {
      data,
      status,
    };
  }

  async send({ method, body = null, params = "/" }) {
    this.xhr.open(method, `${this.url}${params}`);

    const promise = new Promise((resolve) => {
      this.xhr.onload = () => {
        if (this.xhr.readyState === 4) {
          if (this.xhr.status === 200) {
            resolve({
              data: JSON.parse(this.xhr.response),
              status: this.xhr.status,
            });
          } else {
            resolve({
              data: "Error",
              status: this.xhr.status,
            });
          }
        }
      };

      this.xhr.onerror = () => {
        console.error(this.xhr.statusText);
      };

      this.xhr.send(body);
    });

    return promise;
  }
}

(() => {
  const api = new HttpRequest();
  const root = document.querySelector("#root");
  const form = document.querySelector("#form");

  const render = ({ data, status }) => {
    root.innerHTML = "";

    if (status === 200) {
      data.forEach((item) => {
        const h1 = document.createElement("h1");
        h1.innerText = item.name;
        root.append(h1);
      });
    } else {
      root.innerHTML = "Algo saiu errado...";
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("input").value;

    const { data, status } = await api.get(`/users/${name}/repos`);

    render({ data, status });
  });
})();
