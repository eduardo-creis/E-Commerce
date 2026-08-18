document.addEventListener("DOMContentLoaded", () => {
  const produtos = document.querySelectorAll(".produto");
  const contador = document.getElementById("contador");
  const lista = document.getElementById("listaCarrinho");
  const carrinhoBox = document.getElementById("carrinho");
  const totalEl = document.getElementById("total");
  const btnCarrinho = document.getElementById("btnCarrinho");
  const btnFechar = document.getElementById("fecharCarrinho");

  // carrinho: { id: { nome, preco, qtd } }
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};

  // ADICIONAR PRODUTO
  produtos.forEach(prod => {
    prod.querySelector("button").addEventListener("click", () => {
      const id = prod.dataset.id;
      const nome = prod.dataset.nome;
      const preco = Number(prod.dataset.preco);

      if (carrinho[id]) {
        carrinho[id].qtd++;
      } else {
        carrinho[id] = { nome, preco, qtd: 1 };
      }

      salvar();
      atualizar();
    });
  });

  // FUNÇÃO ATUALIZAR CARRINHO
  function atualizar() {
    lista.innerHTML = "";
    let total = 0;
    let count = 0;

    Object.entries(carrinho).forEach(([id, item]) => {
      total += item.preco * item.qtd;
      count += item.qtd;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.nome} (x${item.qtd}) - R$ ${item.preco * item.qtd} 
        <button class="remover" data-id="${id}">X</button>
      `;
      lista.appendChild(li);
    });

    contador.textContent = count;
    totalEl.textContent = `Total: R$ ${total}`;
  }

  // REMOVER PRODUTO
  lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("remover")) {
      const id = e.target.dataset.id;
      delete carrinho[id];
      salvar();
      atualizar();
    }
  });

  // SALVAR NO LOCALSTORAGE
  function salvar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  // ABRIR E FECHAR CARRINHO
  btnCarrinho.addEventListener("click", () => {
    carrinhoBox.classList.remove("hidden");
  });

  btnFechar.addEventListener("click", () => {
    carrinhoBox.classList.add("hidden");
  });

  // ATUALIZA NA ABERTURA
  atualizar();
});