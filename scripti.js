
let produto = document.getElementById("produto");
let quantidade = document.getElementById("quantidade");
let validade = document.getElementById("validade");

function getEstoque() {
    let estoque = localStorage.getItem('estoque');
    return estoque ? JSON.parse(estoque) : [];
}

function salvarEstoque(estoque) {
    localStorage.setItem('estoque', JSON.stringify(estoque));
}

function adicionarEstoque() {
    let estoque = getEstoque();

    let novoItem = {
        id: Date.now(),
        produto: produto.value,
        quantidade: quantidade.value,
        validade: validade.value
    };

    estoque.push(novoItem);
    salvarEstoque(estoque);
    listarEstoque();

    // Limpa campos
    produto.value = '';
    quantidade.value = '';
    validade.value = '';
}

function listarEstoque() {
    let estoque = getEstoque();
    let tabela = document.querySelector("#tabelaEstoque tbody");
    tabela.innerHTML = '';

    estoque.forEach(item => {
        let tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${item.id}</td>
            <td contenteditable="true" onblur="editarItem(${item.id}, 'produto', this.innerText)">${item.produto}</td>
            <td contenteditable="true" onblur="editarItem(${item.id}, 'quantidade', this.innerText)">${item.quantidade}</td>
            <td contenteditable="true" onblur="editarItem(${item.id}, 'validade', this.innerText)">${item.validade}</td>
            <td><button onclick="removerItem(${item.id})">Remover</button></td>
        `;

        tabela.appendChild(tr);
    });
}

function editarItem(id, campo, valor) {
    let estoque = getEstoque();
    let item = estoque.find(i => i.id === id);
    if (item) {
        item[campo] = valor;
        salvarEstoque(estoque);
    }
}

function removerItem(id) {
    let estoque = getEstoque();
    estoque = estoque.filter(item => item.id !== id);
    salvarEstoque(estoque);
    listarEstoque();
}

// Carregar ao iniciar
document.addEventListener('DOMContentLoaded', listarEstoque);
