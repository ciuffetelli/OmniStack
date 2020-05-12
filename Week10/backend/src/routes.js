const { Router } = require('express');
/*      CONTROLLERS     */
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const TechController = require('./controllers/TechController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);

routes.get('/techs', TechController.index);

//Metodos HTTP: get, post, put, delete
//Tipos de Parametros:
    //Query Params: request.query (filtros, ordenação, paginacao)
    //Route Params: request.parans (Identificar um recurso na alteração ou remoção) url/:id
    //Body:         request.body (Dados para a criação ou alteração de um registro)

module.exports = routes;