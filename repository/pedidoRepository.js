let pedidos = [];
let contador = 1;

function salvar(pedido) {
  pedido.codigo = contador++;
  pedidos.push(pedido);
  return pedido;
}

function listar() {
  return pedidos;
}

function buscarPorCodigo(codigo) {
  return pedidos.find(p => p.codigo === codigo);
}

function atualizarSituacao(codigo, situacao) {
  const pedido = buscarPorCodigo(codigo);
  if (pedido) {
    pedido.situacao = situacao;
  }
  return pedido;
}

function remover(codigo) {
  const index = pedidos.findIndex(p => p.codigo === codigo);
  if (index !== -1) {
    pedidos.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  salvar,
  listar,
  buscarPorCodigo,
  atualizarSituacao,
  remover
};