import React from 'react';

import api from '../../services/api';

import './styles.css';

export default function Main() {
    return(
        <div className="main">
            <div className="players">
                <div className="player">
                    ExFury
                </div>
                <div className="player">
                    GabrielS3T
                </div>
                <div className="player">
                    Neon
                </div>
                <div className="player">
                    ZoltanBR
                </div>
            </div>
        </div>
    );
}