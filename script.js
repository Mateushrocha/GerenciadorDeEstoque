class Produto {
    constructor(id, nome, quantidade, validade) {
        this.id = id;
        this.produto = nome;
        this.quantidade = quantidade;
        this.validade = validade;
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem("id");
        if (id == null) {
            localStorage.setItem("id", 0);
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(produto) {
        let id = this.getProximoId();
        produto.id = id;
        localStorage.setItem(id, JSON.stringify(produto));
        localStorage.setItem('id', id);
    }

    recuperarTodosRegistros() {
        let produtos = [];
        let id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            let produto = localStorage.getItem(i);
            if (produto != null) {
                produtos.push(JSON.parse(produto));
            }
        }

        return produtos;
    }

    remover(id) {
        localStorage.removeItem(id);
    }
}

let bd = new Bd();

function adicionarEstoque() {
    const nome = document.getElementById("produto").value.trim();
    const quantidade = document.getElementById("quantidade").value;
    const validade = document.getElementById("validade").value;

    if (nome === "" || quantidade === "" || validade === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let produto = new Produto(null, nome, quantidade, validade);
    bd.gravar(produto);

    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("validade").value = "";

    carregarEstoque();
}

function carregarEstoque() {
    const tabela = document.querySelector("#tabelaEstoque tbody");
    tabela.innerHTML = "";

    let produtos = bd.recuperarTodosRegistros();

    produtos.forEach((produto) => {
        let linha = tabela.insertRow();

        let cellId = linha.insertCell(0);
        let cellNome = linha.insertCell(1);
        let cellQuantidade = linha.insertCell(2);
        let cellValidade = linha.insertCell(3);
        let cellRemover = linha.insertCell(4);

        cellId.innerText = produto.id;
        cellNome.innerText = produto.produto;
        cellQuantidade.innerText = produto.quantidade;
        cellValidade.innerText = produto.validade;

        let btnRemover = document.createElement("button");
        btnRemover.innerText = "Remover";
        btnRemover.classList.add("btn-remover");
        btnRemover.onclick = function () {
            removerProduto(produto.id);
        };

        cellRemover.appendChild(btnRemover);
    });
}

function removerProduto(id) {
    bd.remover(id);
    carregarEstoque();
}

window.onload = function () {
    carregarEstoque();
};
