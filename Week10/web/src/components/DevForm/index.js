import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import './Style.css';

function DevForm({ onSubmit }){
    const [ github_username, setGithub_username] = useState('');
    const [ techs, setTechs] = useState([]);
    const [ techsList, setTechsList] = useState([]);
    const [ latitude, setLatitude] = useState('');
    const [ longitude, setLongitude] = useState('');

    useEffect(() => {
      async function loadDevs(){
        const response = await api.get('/techs');

        setTechsList(response.data);
      };

      loadDevs();
    }, []);    

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (possition) => {
            const { latitude, longitude} = possition.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
            //Gato
            techs.sort();
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          })});    
          
    async function handleSubmit(e){
        e.preventDefault();

        //const techsToString = techs.join(', ');

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude   
        });

        setGithub_username('');
        setTechs([]);        
    }

    function addTechs(tech){
      let newTechs;

      if(techs.indexOf(tech) > -1){

        newTechs = techs.filter(item => item !== tech);
        
      }else{
        newTechs = [...techs, tech];
      }

      setTechs(newTechs);
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário Github</label>
            <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithub_username(e.target.value)} />
          </div>            
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <div className="techsCLoud">
              {techsList.map(tech => {

                let selected;
                if(techs.indexOf(tech) > -1) selected = 'selected';

                return (
                  <div key={tech._id} className={selected} onClick={() => addTechs(tech)} >{tech}</div>
                )

              })}
            </div>
          </div>           
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="text" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)} />
            </div>   
              <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="text" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)} />
            </div>               
          </div> 
          <button type="submit">Salvar</button>
        </form>
    )};

export default DevForm;    