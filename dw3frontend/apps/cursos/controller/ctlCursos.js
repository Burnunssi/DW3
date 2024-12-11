const { Cookie } = require("express-session");
const moment = require("moment");
const axios = require("axios");

const ManutUsers = async (req, res) =>
  (async () => {
    if (req.method == "POST") {
      const formData = req.body;
      if (!validate.Validar(formData)) {
        return res.status(400).json({ status: "error", msg: "Dados de entrada validados" });
      };

      const resp = await axios.post(process.env.SERVIDOR_SIADBack + "/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(error => {
        return res.status(400).json({ status: "error", msg: error.response.data.msg });
      });

      if (!resp.data) {
        return;
      }
      //console.log("[ctlLogin.js] Valor RESP.DATA:", resp.data);


      return res.json({ status: "ok", msg: "Login com sucesso!" });
    } else { //GET      
      var parametros = { title: "SIAD - Manutenção de usuários" }
      res.render("30100admin/30110adminUser/view/vwAdminUser.njk", { parametros });
    }
  })();


const manutCursos = async (req, res) =>
  (async () => {
    //@ Abre o formulário de manutenção de cursos
    const userName = req.session.userName;
    const token = req.session.token;
    //console.log("[ctlCursos|ManutCursos] Valor token:" + token)
    // try {
    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllCursos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Set JWT token in the header
      }
    }).catch(error => {
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível"

      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";

      } else {
        remoteMSG = error;
      }
      res.render("cursos/view/vwManutCursos.njk", {
        title: "Manutenção de cursos",
        data: null,
        erro: remoteMSG, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }


    res.render("cursos/view/vwManutCursos.njk", {
      title: "Manutenção de cursos",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertCursos = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;

      //@ Busca os cursos disponíveis
      const cursos = await axios.get(
        process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Set JWT token in the header
        }
      });

      return res.render("cursos/view/vwFCrCursos.njk", {
        title: "Cadastro de cursos",
        data: null,
        erro: null, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        curso: cursos.data.registro,
        userName: null,
      });

    } else {
      //@ POST
      const regData = req.body;
      const token = req.session.token;

      try {
        // @ Enviando dados para o servidor Backend
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertCursos", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000, // @ 5 segundos de timeout
        });

        //console.log('[ctlCursos|InsertCursos] Dados retornados:', response.data);

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('Erro ao inserir dados no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: response.data,
          erro: null,
        });
      }
    }
  })();

const ViewCursos = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getCursoByID",
          {
            cursoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log('[ctlCursos|ViewCursos] Dados retornados:', response.data);
        if (response.data.status == "ok") {
          //@ Busca os cursos disponíveis
          const cursos = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` // Set JWT token in the header
            }
          });

          response.data.registro[0].datanascimento = moment(response.data.registro[0].datanascimento).format(
            "YYYY-MM-DD"
          );

          res.render("cursos/view/vwFRUDrCursos.njk", {
            title: "Visualização de cursos",
            data: response.data.registro[0],
            disabled: true,
            curso: cursos.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlCursos|ViewCursos] ID de curso não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlCursos.js|ViewCursos] Curso não localizado!" });
      console.log(
        "[ctlCursos.js|viewCursos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

const UpdateCurso = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getCursoByID",
          {
            cursoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log('[ctlCursos|UpdateCurso] Dados retornados:', response.data);
        if (response.data.status == "ok") {
          //@ Busca os cursos disponíveis
          const cursos = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` // Set JWT token in the header
            }
          });

          response.data.registro[0].datanascimento = moment(response.data.registro[0].datanascimento).format(
            "YYYY-MM-DD"
          );

          res.render("cursos/view/vwFRUDrCursos.njk", {
            title: "Atualização de dados de cursos",
            data: response.data.registro[0],
            disabled: false,
            curso: cursos.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlCursos|UpdateCurso] Dados não localizados");
        }
      } else {
        //@ POST
        const regData = req.body;
        const token = req.session.token;
        // console.log("[ctlCursos|UpdateCurso] Valor regData:", JSON.stringify(regData));
        try {
          // @ Enviando dados para o servidor Backend
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateCursos", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000, // @ 5 segundos de timeout
          });

          //console.log('[ctlCursos|InsertCursos] Dados retornados:', response.data);

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlCursos.js|UpdateCurso] Erro ao atualiza dados de cursos no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: response.data,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlCursos.js|UpdateCurso] Curso não localizado!" });
      console.log(
        "[ctlCursos.js|UpdateCurso] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const DeleteCurso = async (req, res) =>
  (async () => {
    //@ POST
    const regData = req.body;
    const token = req.session.token;
    // console.log("[ctlCursos|UpdateCurso] Valor regData:", JSON.stringify(regData));
    try {
      // @ Enviando dados para o servidor Backend
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/deleteCursos", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000, // @ 5 segundos de timeout
      });

      //console.log('[ctlCursos|DeleteCurso] Dados retornados:', response.data);

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlCursos|DeleteCurso] Erro ao excluir dados de cursos no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: response.data,
        erro: null,
      });
    }
  })();

module.exports = {
  ManutUsers,
  manutCursos,
  insertCursos,
  ViewCursos,
  UpdateCurso,
  DeleteCurso,
};
