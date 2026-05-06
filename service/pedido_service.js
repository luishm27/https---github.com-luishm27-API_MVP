const repository = require("../repository/pedidoRepository");

function situacaoValida(situacao) {
  return ["aberto", "pago", "finalizado"].includes(situacao);
}

function criar(dados) {
  const { clienteCpf, clienteNome, produtoNome, produtoPreco } = dados;

  if (!clienteCpf) throw new Error("CPF obrigatório");
  if (!/^\d{9}$/.test(clienteCpf))
    throw new Error("CPF deve ter 9 números");

  if (!clienteNome) throw new Error("Nome obrigatório");
  if (clienteNome.length < 5)
    throw new Error("Nome deve ter no mínimo 5 caracteres");

  if (!produtoNome) throw new Error("Produto obrigatório");
  if (produtoNome.length < 5)
    throw new Error("Produto deve ter no mínimo 5 caracteres");

  if (produtoPreco == null)
    throw new Error("Preço obrigatório");
  if (produtoPreco <= 0)
    throw new Error("Preço deve ser positivo");

  const pedido = {
    dataHora: new Date(),
    clienteCpf,
    clienteNome,
    produtoNome,
    produtoPreco,
    situacao: "aberto"
  };

  return repository.salvar(pedido);
}

function listar(situacao) {
  let pedidos = repository.listar();

  if (situacao) {
    if (!situacaoValida(situacao)) {
      throw new Error("Situação inválida");
    }
    pedidos = pedidos.filter(p => p.situacao === situacao);
  }

  return pedidos.map(p => ({
    codigo: p.codigo,
    dataHora: p.dataHora,
    clienteNome: p.clienteNome,
    produtoNome: p.produtoNome,
    situacao: p.situacao,
    valorTotal: p.produtoPreco
  }));
}

function buscar(codigo) {
  if (isNaN(codigo)) throw new Error("Código deve ser número");

  const pedido = repository.buscarPorCodigo(codigo);
  if (!pedido) throw new Error("Pedido não encontrado");

  return {
    codigo: pedido.codigo,
    dataHora: pedido.dataHora,
    clienteCpf: pedido.clienteCpf,
    clienteNome: pedido.clienteNome,
    produtoNome: pedido.produtoNome,
    situacao: pedido.situacao,
    valorTotal: pedido.produtoPreco
  };
}

function atualizar(codigo, situacao) {
  if (isNaN(codigo)) throw new Error("Código deve ser número");
  if (!situacao) throw new Error("Situação obrigatória");
  if (!situacaoValida(situacao))
    throw new Error("Situação inválida");

  const pedido = repository.atualizarSituacao(codigo, situacao);
  if (!pedido) throw new Error("Pedido não encontrado");

  return pedido;
}

function remover(codigo) {
  if (isNaN(codigo)) throw new Error("Código deve ser número");

  const ok = repository.remover(codigo);
  if (!ok) throw new Error("Pedido não encontrado");
}

module.exports = {
  criar,
  listar,
  buscar,
  atualizar,
  remover
};
