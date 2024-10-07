const db = require("../../../database/databaseconfig");

const getAllEscola = async () => {
  return (
    await db.query(
      "SELECT * FROM escola WHERE deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getEscolaByID = async (escolaIDPar) => {
  return (
    await db.query(
      "SELECT * FROM Escola WHERE escolaid = $1 and deleted = false ORDER BY nome ASC",
      [escolaIDPar]
    )
  ).rows;
};

const insertEscola = async (escolaREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO escola " + "values(default, $1, $2, $3, $4)",
        [
          escolaREGPar.codigo,
          escolaREGPar.nome,
          escolaREGPar.dataAbertura,
          escolaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlEscola|insertEscola] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const updateEscola = async (escolaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE Escola SET " +
        "codigo = $2, " +
        "nome = $3, " +
        "dataAbertura = $4, " +
        "deleted = $5 " +
        "WHERE escolaid = $1",
        [
          escolaREGPar.escolaid,
          escolaREGPar.codigo,
          escolaREGPar.nome,
          escolaREGPar.dataAbertura,
          escolaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlEscola|updateEscola] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteEscola = async (escolaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE escola SET " + "deleted = true " + "WHERE escolaid = $1",
        [escolaREGPar.escolaid]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlEscola|deleteEscola] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllEscola,
  getEscolaByID,
  insertEscola,
  updateEscola,
  deleteEscola,
};
