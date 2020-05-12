const axios = require('axios');
//MODELS
const Techs = require('../models/Techs');

module.exports = {
    index (request, response){
        const techsList = ['JavaScript', 'Java', 'Python', 'C#', 'PHP', 'Laravel', 'C++', 'C', 'TypeScript', 'Ruby', 'Swift', 'MongoDB', 'SQL', 'ReactJS', 'React Native', 'Vue'];
        return response.json(techsList);
    },

    // async index (request, response){
    //     const techs = await Techs.find();

    //     if (techs) return response.json(techs);

    //     return response.json(this.StartData());
    //},

    async StartData(){
        const techsList = ['JavaScript', 'Java', 'Python', 'C#', 'PHP', 'Laravel', 'C++', 'C', 'TypeScript', 'Ruby', 'Swift', 'MongoDB', 'SQL', 'ReactJS', 'React Native', 'Vue'];

        let data = [];
        let dataTemp;

        await techsList.map(tech => {
            this.Save(data);          
        });
        return data;
    },

    async Save(data){
        dataTemp = await Techs.create({ data });
        data.push(dataTemp);  
    }
}