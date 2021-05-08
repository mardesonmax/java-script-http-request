<H1 align="center">Consumindo API com JavaScript <b>puro</b></H1>

<p align="center">Utilizando HttpRequest para requisições GET e POST na api do GITHUB.</p>

<p  align="center">
  <a href="# tecnologias">Tecnologias</a> <span>&nbsp;&nbsp;●&nbsp;&nbsp;</span>
  <a href="#como-utilizar">Como Utilizar</a> 
<p>

## 💻️ Tecnologias

- HTML
- JavaScript

## 🚀️ Como Utilizar

- Importar httpRequest em seu arquivo html

```html
<script src="./js/httpRequest.js"></script>
```

- Substituir a url no construtor da class HttpRequest

```js
  class HttpRequest {
  constructor() {
    this.xhr = new XMLHttpRequest();
    this.url = "https://api.github.com"; // Utilize sua url aqui
  }
```

- Utizar GET ou Post com base no exemplo abaixo

```js
(() => {
  const api = new HttpRequest();
  const root = document.querySelector("#root");
  const form = document.querySelector("#form");

  // Responsável por exibir dados na tela
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

  // Formulário
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // valor do input
    const name = form.querySelector("input").value;

    // GET
    // Data => Resposta da Requisição
    // status => Status da Requisição
    const { data, status } = await api.get(`/users/${name}/repos`);

    // Função para exibir dados na tela
    render({ data, status });
  });
})();
```
