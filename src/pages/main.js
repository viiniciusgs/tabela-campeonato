import React, { useState, useEffect } from 'react';

import api from '../services/api';

import { IoIosArrowDown } from 'react-icons/io';

import imageIcon from '../images/icon.svg';
import imagemLogo from '../images/logo.svg';
import '../styles/main.css';
import '../styles/animations.css';

export default function Main() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        loadPlayers();
    }, []);

    async function loadPlayers() {
        const response = await api.get('/players');

        setPlayers(response.data);
    }

    return(
        <div className="main">
            <div className="container">
                <h1>CAMPEONATO PÃO DE BATATÃ</h1>

                <div className="cards">
                    <div className="player">
                        <img src={imageIcon} alt="Rocket League"></img>
                        <h3>ExFury</h3>
                    </div>

                    <div className="player">
                        <img src={imageIcon} alt="Rocket League"></img>
                        <h3>GabrielS3T</h3>
                    </div>

                    <div className="player">
                        <img src={imageIcon} alt="Rocket League"></img>
                        <h3>Neon</h3>
                    </div>

                    <div className="player">
                        <img src={imageIcon} alt="Rocket League"></img>
                        <h3>Zoltan</h3>
                    </div>
                </div>

                <button>
                    <a href="#championship-infos">
                        <IoIosArrowDown size={20} />
                    </a>
                </button>
            </div>

            <div id="championship-infos" className="championship-infos">
                <img src={imagemLogo} alt="Rocket League" />

                <table className="content-table">
                    <thead>
                        <tr>
                            <th>CLASSIFICAÇÃO</th>
                            <th>P</th>
                            <th>J</th>
                            <th>V</th>
                            <th>D</th>
                            <th>GP</th>
                            <th>GC</th>
                            <th>SG</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {players.map((player, index) => {
                            return(
                                <tr key={player._id}>
                                    <td><h3><p>{index+1}</p>{player.name}</h3></td>
                                    <td>{player.score}</td>
                                    <td>{player.gamesPlayed}</td>
                                    <td>{player.wins}</td>
                                    <td>{player.loses}</td>
                                    <td>{player.goalsScored}</td>
                                    <td>{player.concededGoals}</td>
                                    <td>{player.goalDifference}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}