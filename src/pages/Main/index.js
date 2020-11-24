import React from 'react';

import api from '../../services/api';

import { IoIosArrowDown } from 'react-icons/io';

import imageIcon from '../../images/rocket-league.svg';
import './styles.css';
import './animations.css';

export default function Main() {
    return(
        <div className="main">
            <div className="container">
                <h1>CAMPEONATO PÃO DE BATATÃ</h1>

                <div className="cards">
                    <div className="player">
                        <img src={imageIcon}></img>
                        ExFury
                    </div>

                    <div className="player">
                        <img src={imageIcon}></img>
                        GabrielS3T
                    </div>

                    <div className="player">
                        <img src={imageIcon}></img>
                        Neon
                    </div>

                    <div className="player">
                        <img src={imageIcon}></img>
                        Zoltan
                    </div>
                </div>

                <button>
                    <IoIosArrowDown size={20} />
                </button>
            </div>
        </div>
    );
}