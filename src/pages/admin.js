import 'dotenv/config';

import React, { useState, useEffect } from 'react';

import api from '../services/api';

import { IoMdArrowForward } from 'react-icons/io';

import Container from '../components/Container';
import Historic from '../components/Historic';

import imagemLogo from '../images/logo.svg';

import '../styles/login.css';
import '../styles/main.css';

export default function Admin() {
    const [players, setPlayers] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        loadPlayers();
    }, []);

    async function loadPlayers() {
        const response = await api.get('/players');

        setPlayers(response.data);
    }

    function login() {
        if(password === process.env.REACT_APP_PASSWORD) {
            setIsLogged(true);
        } else {
            window.location.href = '/';
        }
    }

    if(isLogged === false) {
        return(
            <div className="login-admin">
                <form onSubmit={login}>
                    <div className="logIn">
                        <h1>Login in</h1>
                        <h2>Acesso apenas para admins</h2>
                    </div>

                    <input type="password" placeholder="Insira a senha" onChange={event => setPassword(event.target.value)} />
                    <button type="button" onClick={login}>LOGIN<IoMdArrowForward /></button>
                </form>
            </div>
        );
    }

    return(
        <div className="main">
            <Container />

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

            <Historic />
        </div>
    );
}