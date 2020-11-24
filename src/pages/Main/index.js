import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { IoIosArrowDown } from 'react-icons/io';

import imageIcon from '../../images/rocket-league.svg';
import rankGold from '../../images/gold.png';
import rankSilver from '../../images/silver.png';
import rankBronze from '../../images/bronze.png';
import unranked from '../../images/unranked.png';
import './styles.css';
import './animations.css';

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
                        <img src={imageIcon}></img>
                        <h3>ExFury</h3>
                    </div>

                    <div className="player">
                        <img src={imageIcon}></img>
                        <h3>GabrielS3T</h3>
                    </div>

                    <div className="player">
                        <img src={imageIcon}></img>
                        <h3>Neon</h3>
                    </div>

                    <div className="player">
                        <img src={imageIcon}></img>
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
                            let rank = '';

                            if(index === 0) {
                                rank = rankGold; 
                            } else if(index === 1) {
                                rank = rankSilver;
                            } else if(index === 2) {
                                rank = rankBronze;
                            } else {
                                rank = unranked;
                            }

                            return(
                                <tr key={player._id}>
                                    <td><img src={rank} />{` ${player.name}`}</td>
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