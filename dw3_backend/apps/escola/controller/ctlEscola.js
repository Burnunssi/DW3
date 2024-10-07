const mdlEscola = require("../model/mdlEscola");

const getAllEscola = (req, res) =>
  (async () => {
    let registro = await mdlEscola.getAllEscola();
    res.json({ status: "ok", "registro": registro });
  })();

const getEscolaByID = (req, res) =>
  (async () => {
    const escolaID = parseInt(req.body.escolaid);
    let registro = await mdlEscola.getEscolaByID(escolaID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertEscola = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const escolaREG = request.body;
    let { msg, linhasAfetadas } = await mdlEscola.insertEscola(escolaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateEscola = (request, res) =>
  (async () => {
    const escolaREG = request.body;
    let { msg, linhasAfetadas } = await mdlEscola.updateEscola(escolaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const deleteEscola = (request, res) =>
  (async () => {
    const escolaREG = request.body;
    let { msg, linhasAfetadas } = await mdlEscola.deleteEscola(escolaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllEscola,
  getEscolaByID,
  insertEscola,
  updateEscola,
  deleteEscola
};
