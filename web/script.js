document.addEventListener("DOMContentLoaded", () => {
    const formPedido = document.getElementById("formPedido");
    const formPedidoEndereco = document.getElementById("formPedidoEndereco");
    const listPedidosExecucao = document.getElementById("listPedidosExecucao");
    const listPedidosEntrega = document.getElementById("listPedidosEntrega");
    const listPedidosFinalizados = document.getElementById("listPedidosFinalizados");
    const mostrarConcluidos = document.getElementById("mostrarConcluidos");
    const excluirTodosDados = document.getElementById("excluirTodosDados");

    function carregarPedidos() {
        const pedidosExecucao = JSON.parse(localStorage.getItem("pedidosExecucao")) || [];
        const pedidosEntrega = JSON.parse(localStorage.getItem("pedidosEntrega")) || [];
        const pedidosFinalizados = JSON.parse(localStorage.getItem("pedidosFinalizados")) || [];
        const pedidosEndereco = JSON.parse(localStorage.getItem("pedidosEndereco")) || [];

        listPedidosExecucao.innerHTML = "";
        pedidosExecucao.forEach((pedido, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <p><strong>Cliente:</strong> ${pedido.cliente}</p>
                <p><strong>Produto:</strong> ${pedido.produto}</p>
                <p><strong>Endereco:</strong> ${pedido.Endereco}</p>
                <p><strong>Data:</strong> ${pedido.data}</p>
                <button onclick="moverParaEntrega(${index}, 'execucao')">Mover para Entrega</button>
            `;
            listPedidosExecucao.appendChild(card);
        });

        listPedidosEntrega.innerHTML = "";
        pedidosEntrega.forEach((pedido, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <p><strong>Cliente:</strong> ${pedido.cliente}</p>
                <p><strong>Produto:</strong> ${pedido.produto}</p>
                <p><strong>Endereco:</strong> ${pedido.Endereco}</p>
                <p><strong>Data:</strong> ${pedido.data}</p>
                <button onclick="finalizarPedido(${index}, 'entrega')">Finalizar Pedido</button>
            `;
            listPedidosEntrega.appendChild(card);
        });

        listPedidosFinalizados.innerHTML = "";
        pedidosFinalizados.forEach((pedido) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <p><strong>Cliente:</strong> ${pedido.cliente}</p>
                <p><strong>Produto:</strong> ${pedido.produto}</p>
                <p><strong>Endereco:</strong> ${pedido.Endereco}</p>
                <p><strong>Data:</strong> ${pedido.data}</p>
                <button onclick="excluirPedidoFinalizado(${pedido.id})">Excluir</button>
            `;
            listPedidosFinalizados.appendChild(card);
        });
    }

    formPedido.addEventListener("submit", (e) => {
        e.preventDefault();

        const cliente = document.getElementById("cliente").value;
        const produto = document.getElementById("produto").value;
        const data = new Date().toLocaleString();

        const pedido = { cliente, produto, data };

        const pedidosExecucao = JSON.parse(localStorage.getItem("pedidosExecucao")) || [];
        pedidosExecucao.push(pedido);
        localStorage.setItem("pedidosExecucao", JSON.stringify(pedidosExecucao));

        carregarPedidos();
        formPedido.reset();
    });

    window.moverParaEntrega = (index, tipo) => {
        const pedidosExecucao = JSON.parse(localStorage.getItem("pedidosExecucao")) || [];
        const pedidosEntrega = JSON.parse(localStorage.getItem("pedidosEntrega")) || [];

        const pedido = pedidosExecucao.splice(index, 1)[0];
        pedidosEntrega.push(pedido);

        localStorage.setItem("pedidosExecucao", JSON.stringify(pedidosExecucao));
        localStorage.setItem("pedidosEntrega", JSON.stringify(pedidosEntrega));

        carregarPedidos();
    };

    window.finalizarPedido = (index, tipo) => {
        const pedidosEntrega = JSON.parse(localStorage.getItem("pedidosEntrega")) || [];
        const pedidosFinalizados = JSON.parse(localStorage.getItem("pedidosFinalizados")) || [];

        const pedido = pedidosEntrega.splice(index, 1)[0];
        pedidosFinalizados.push(pedido);

        localStorage.setItem("pedidosEntrega", JSON.stringify(pedidosEntrega));
        localStorage.setItem("pedidosFinalizados", JSON.stringify(pedidosFinalizados));

        carregarPedidos();
    };

    window.excluirPedidoFinalizado = (id) => {
        const pedidosFinalizados = JSON.parse(localStorage.getItem("pedidosFinalizados")) || [];
        
        const pedidosRestantes = pedidosFinalizados.filter(pedido => pedido.id !== id);

        localStorage.setItem("pedidosFinalizados", JSON.stringify(pedidosRestantes));

        carregarPedidos();
    };

    // Função para excluir todos os dados
    excluirTodosDados.addEventListener("click", () => {
        localStorage.clear();
        carregarPedidos();
    });

    mostrarConcluidos.addEventListener("click", () => {
        listPedidosFinalizados.classList.toggle("hidden");
    });

    carregarPedidos();
});
