import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [ Devs, setDevs] = useState([]);

    useEffect(() => {
      async function loadDevs(){
        const response = await api.get('/devs');

        setDevs(response.data);
      };

      loadDevs();
    }, []);

    async function handleSubmit(data){

      const response = await api.post('/devs', data);

      setDevs([...Devs, response.data]);
    };    

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>
      <main>
        <ul>
          {Devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
