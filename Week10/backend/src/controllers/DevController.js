const axios = require('axios');
//MODELS
const Dev = require('../models/Dev');
//Utils
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    async index (request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(dev) return response.json(dev);

        const gitResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const {name = login, bio, avatar_url} = gitResponse.data;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        dev = await Dev.create({
            name, 
            github_username,
            bio,
            avatar_url,
            techs,
            location,
        })

        const sendSocketMessageTo = findConnections(
            { latitude, longitude},
            techs
        );

        sendMessage(sendSocketMessageTo, 'new-dev', dev);


        return response.json(dev);
    },
};