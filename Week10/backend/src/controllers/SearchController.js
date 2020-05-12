//MODELS
const Dev = require('../models/Dev');
//Utils
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index (request, response) {
        const { techs, latitude, longitude } = request.query;
        let findData;

        if(techs == ''){
            findData = {
                location:{
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 10000,
                    },
                },                
            }
        }else{
            const techsArray = parseStringAsArray(techs);
            
            findData = {
                techs: {
                    $in: techsArray,
                },
                location:{
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 10000,
                    },
                },
            }
        }

        const devs = await Dev.find(findData);
        
        return response.json({devs});
    },
};