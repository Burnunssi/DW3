var express = require('express');
var router = express.Router();
var cursosApp = require("../apps/cursos/controller/ctlCursos");

// Função de autenticação para verificar se o usuário está logado
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida
    isLogged = req.session.isLogged;
  
    if (!isLogged) {
        return res.redirect("/Login");
    }
    next();
}

/* GET métodos */
router.get('/manutCursos', authenticationMiddleware, cursosApp.manutCursos);
router.get('/insertCurso', authenticationMiddleware, cursosApp.insertCursos);
router.get('/viewCurso/:id', authenticationMiddleware, cursosApp.ViewCursos);
router.get('/updateCurso/:id', authenticationMiddleware, cursosApp.UpdateCurso);

/* POST métodos */
router.post('/insertCurso', authenticationMiddleware, cursosApp.insertCursos);
router.post('/updateCurso', authenticationMiddleware, cursosApp.UpdateCurso);
router.post('/deleteCurso', authenticationMiddleware, cursosApp.DeleteCurso);

module.exports = router;