const express = require("express");
const app = express();

const service = require("./service/pedidoService");

app.use(express.json());

app.post("/api/pedidos", (req, res) => {
  try {
    const pedido = service.criar(req.body);
    res.status(201).json(pedido);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

app.get("/api/pedidos", (req, res) => {
  try {
    const lista = service.listar(req.query.situacao);
    res.json(lista);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

app.get("/api/pedidos/:codigo", (req, res) => {
  try {
    const pedido = service.buscar(parseInt(req.params.codigo));
    res.json(pedido);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

app.patch("/api/pedidos/:codigo", (req, res) => {
  try {
    const pedido = service.atualizar(
      parseInt(req.params.codigo),
      req.body.situacao
    );
    res.json(pedido);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

app.delete("/api/pedidos/:codigo", (req, res) => {
  try {
    service.remover(parseInt(req.params.codigo));
    res.json({ mensagem: "Pedido removido com sucesso" });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});


app.listen(3000, () => {
  console.log("Servidor está rodando na porta 3000");
  console.log("Rotas disponíveis:");
  console.log("  GET    /api/pedidos           -> Lista pedidos");
  console.log("  GET    /api/pedidos/:codigo   -> Busca por código");
  console.log("  POST   /api/pedidos           -> Criar pedido");
  console.log("  PATCH  /api/pedidos/:codigo   -> Atualiza situação");
  console.log("  DELETE /api/pedidos/:codigo   -> Remove pedido");
});