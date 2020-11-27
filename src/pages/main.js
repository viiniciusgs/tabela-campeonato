import React, { useState, useEffect } from 'react';

import api from '../services/api';

import Container from '../components/Container';
import Historic from '../components/Historic';

import imagemLogo from '../images/logo.svg';

import '../styles/main.css';

export default function Main() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    const response = await api.get("/players");

    setPlayers(response.data);
  }

  return (
    <div className="main">
      <Container />

      <div id="championship-infos" className="championship-infos">
        <img src={imagemLogo} alt="Rocket League" />

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
      </div>

      <Historic />
    </div>
  );
}
