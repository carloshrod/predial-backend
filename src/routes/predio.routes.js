const { Router } = require('express');
const {
    getPredios, createPredio, updatePredio,
    deletePredio, findPrediosByDoc, findPredioByCode
} = require('../controllers/predio.controller');
const { getHistorial } = require('../controllers/historial.controller');
const { authPredios } = require('../middlewares/authPredios');

const predioRoutes = Router()

predioRoutes.get("/list", getPredios)
predioRoutes.get("/historial", getHistorial)
predioRoutes.post("/create", authPredios, createPredio)
predioRoutes.put("/edit/:_id", authPredios, updatePredio)
predioRoutes.delete("/delete/:_id", authPredios, deletePredio)
predioRoutes.get("/find/:doc_prop", findPrediosByDoc)
predioRoutes.get("/find-one/:codigo", findPredioByCode)

exports.predioRoutes = predioRoutes;