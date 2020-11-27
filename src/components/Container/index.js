import React from 'react';

import { VscChevronDown } from 'react-icons/vsc';

import imageIcon from '../../images/icon.svg';

import './styles.css';
import '../../styles/animations.css';

export default function Container() {
    return(
        <div id="container" className="container">
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
                    <VscChevronDown size={25} />
                </a>
            </button>
        </div>
    );
}