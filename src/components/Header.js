import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ history, isHome = false }) => {
    
    const goToHome = () => {
        history.push(`/`);
    }
    
    return (
        <header className="App-header">
            { !isHome ? <FontAwesomeIcon icon="arrow-left" size="2x" className="back-button" onClick={() => goToHome()} /> : "" }
            <div className="title-wrapper">
                <FontAwesomeIcon icon="pizza-slice" />
                <h1 className="display-1">Pizza Olivarius</h1>
            </div>
        </header>
    )
}

export default Header;
