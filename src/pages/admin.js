import 'dotenv/config';

import React, { useState, useEffect } from 'react';

import api from '../services/api';

import { IoMdArrowForward } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';

import Container from '../components/Container';
import Historic from '../components/Historic';

import imagemLogo from '../images/logo.svg';

import '../styles/admin.css';
import '../styles/main.css';

export default function Admin() {
    const [players, setPlayers] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [password, setPassword] = useState('');

    let localStoragePassword = '';

    useEffect(() => {
        loadPlayers();

        localStoragePassword = JSON.parse(localStorage.getItem('password')) || '';

        if(localStoragePassword === process.env.REACT_APP_PASSWORD) {
            setIsLogged(true);
        }
    }, []);

    async function loadPlayers() {
        const response = await api.get('/players');

        setPlayers(response.data);
    }

    function login() {
        if(localStoragePassword === '') {
            if(password === process.env.REACT_APP_PASSWORD) {
                localStorage.setItem('password', JSON.stringify(password));
    
                setIsLogged(true);
            } else {
                window.location.href = '/';
            }
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

    async function reset() {
        const wantReset = window.confirm('Deseja resetar a tabela?');

        if(wantReset === true) {
            await api.put('/reset-players');

            loadPlayers();

            return;
        }

        return;
    }

    return(
        <div className="main">
            <Container />

            <div id="championship-infos" className="championship-infos">
                <img src={imagemLogo} alt="Rocket League" />

                <button className="reset" onClick={reset}>
                    <GrPowerReset size={20} color='white' />
                </button>

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