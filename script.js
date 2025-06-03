class Produto {
    constructor(nome, quantidade, validade) {
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
        localStorage.setItem(id, JSON.stringify(produto));

        // Atualiza o ID
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
}

let bd = new Bd();

function adicionarEstoque() {
    const nome = document.getElementById("produto").value;
    const quantidade = document.getElementById("quantidade").value;
    const validade = document.getElementById("validade").value;

    let produto = new Produto(nome, quantidade, validade);

    bd.gravar(produto);

    document.getElementById("produto").value = null
    document.getElementById("quantidade").value = undefined
    document.getElementById("validade").value = undefined
    
    carregarEstoque();
}

function carregarEstoque() {
    const tabela = document.querySelector("#tabelaEstoque tbody");
    tabela.innerHTML = ""; // Limpa a tabela antes de carregar

    let produtos = bd.recuperarTodosRegistros();

    produtos.forEach((produto, index) => {
        let linha = tabela.insertRow();

        let cellId = linha.insertCell(0);
        let cellNome = linha.insertCell(1);
        let cellQuantidade = linha.insertCell(2);
        let cellValidade = linha.insertCell(3);
        let cellRemover = linha.insertCell(4);

        cellId.innerText = index + 1; // ou outra lógica para o ID
        cellNome.innerText = produto.produto;
        cellQuantidade.innerText = produto.quantidade;
        cellValidade.innerText = produto.validade;

        // Botão de remover
        let btnRemover = document.createElement("button");
        btnRemover.innerText = "Remover";
        btnRemover.onclick = function() {
            removerProduto(index + 1);
        };
        cellRemover.appendChild(btnRemover);
    });
}

function removerProduto(id) {
    localStorage.removeItem(id);
    carregarEstoque();
}

window.onload = function() {
    carregarEstoque();
};
