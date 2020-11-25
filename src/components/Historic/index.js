import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { VscClose } from 'react-icons/vsc';

import './styles.css';

export default function Historic() {
    const [historic, setHistoric] = useState([]);

    useEffect(() => {
       loadHistoric(); 
    }, []);
    
    async function loadHistoric() {
        const response = await api.get('match-history');

        setHistoric(response.data);
    }

    return(
        <div className="historic">
            <h1>HISTÓRICO DE PARTIDAS</h1>
            {historic.map(match => {
                return(
                    <div className="card-historic" key={match._id}>
                        <h2>{match.winnerName}</h2>
                        <h4 className="scoreboard">
                            {match.winnerGoals}
                            <VscClose size={20} />
                            {match.loserGoals}
                        </h4>
                        <h2>{match.loserName}</h2>
                    </div>
                );
            })}       
        </div>
    );
}