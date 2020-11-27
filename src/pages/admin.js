import 'dotenv/config';

import React, { useState, useEffect } from 'react';

import api from '../services/api';

import { IoMdArrowForward } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import { AiOutlineForm } from 'react-icons/ai';
import { VscClose } from 'react-icons/vsc';

import Container from '../components/Container';
import Historic from '../components/Historic';
import Footer from '../components/Footer';

import imagemLogo from '../images/logo.svg';

import '../styles/admin.css';
import '../styles/main.css';

export default function Admin() {
    const [players, setPlayers] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [password, setPassword] = useState('');
    const [newMatch, setNewMatch] = useState("new-match-none");
    const [winnerName, setWinnerName] = useState('');
    const [winnerGoals, setWinnerGoals] = useState(0);
    const [loserName, setLoserName] = useState('');
    const [loserGoals, setLoserGoals] = useState(0);

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

            window.location.reload();

            return;
        }

        return;
    }

    async function registerNewMatch() {
        let idWinner = '';
        const initialsWinner = winnerName.substring(0, 3);
        let idLoser = '';
        const initialsLoser = loserName.substring(0, 3);
              
        for (const player of players) {
            if(player.name === winnerName) {
                idWinner = player._id;
            } else if(player.name === loserName) {
                idLoser = player._id;
            }
        }

        await api.put(`/players/${idWinner}`, {
            "wins": 1,
            "loses": 0,
            "goalsScored": parseInt(winnerGoals),
            "concededGoals": parseInt(loserGoals)
        });

        await api.put(`/players/${idLoser}`, {
            "wins": 0,
            "loses": 1,
            "goalsScored": parseInt(loserGoals),
            "concededGoals": parseInt(winnerGoals)
        });

        await api.post('/match-history', {
            "winnerName": initialsWinner,
            "winnerGoals": winnerGoals,
            "loserName": initialsLoser,
            "loserGoals": loserGoals
        });
     
        setNewMatch("new-match-none");
        window.location.reload();
    }

    return(
        <div className="main">
            <Container />

            <div id="championship-infos" className="championship-infos">
                <img src={imagemLogo} alt="Rocket League" />

                <button className="reset" onClick={reset}>
                    <GrPowerReset size={20} color='white' />
                </button>

            <div className="table">
                <table className="classification">
                    <thead>
                    <tr>
                        <th>CLASSIFICAÇÃO</th>
                    </tr>
                    </thead>

                    <tbody>
                    {players.map((player, index) => {
                        let name = "";

                        if (window.screen.width < 768) {
                        name = player.name.substring(0, 3);
                        } else {
                        name = player.name;
                        }

                        return (
                        <tr key={player._id}>
                            <td>
                            <h3>
                                <p>{index + 1}</p>
                                {name}
                            </h3>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>

                <table className="content-table">
                    <thead>
                    <tr>
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
                    {players.map((player) => {
                        return (
                        <tr key={player._id}>
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

                <button onClick={() => setNewMatch("new-match")} className="register-new-match">Cadastrar nova partida <AiOutlineForm /></button>

                <div className={newMatch}>
                    <div className="form-new-match">
                        <select onChange={event => setWinnerName(event.target.value)}>
                            <option value="winner">Vencedor</option>

                            {players.map(player => {
                                return(
                                    <option key={player._id} value={player.name}>{player.name}</option> 
                                );
                            })}
                        </select>

                        <input type="number" onChange={event => setWinnerGoals(event.target.value)} placeholder="0" />
                        <VscClose size={20} />
                        <input type="number" onChange={event => setLoserGoals(event.target.value)} placeholder="0" />

                        <select onChange={event => setLoserName(event.target.value)}>
                            <option value="loser">Perdedor</option>

                            {players.map(player => {
                                return(
                                    <option key={player._id} value={player.name}>{player.name}</option> 
                                );
                            })}
                        </select>
                    </div>

                    <button onClick={registerNewMatch}>CADASTRAR</button>
                </div>
            </div>

            <Historic />

            <Footer />
        </div>
    );
}