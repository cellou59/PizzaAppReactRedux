import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPizzaSlice, faShippingFast, faFire, faEuroSign, faEdit, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './components/Header';
import Tile from './components/Tile';

// Stylesheets
import './stylesheets/App.scss';

library.add(faPizzaSlice, faShippingFast, faFire, faEuroSign, faEdit, faTrash, faArrowLeft);

const tiles = [
  {
    name: "Nouvelle commande",
    description: "Créer et enregistrer une nouvelle commande",
    icon: "shipping-fast",
    bgColor: "#006994",
    action: "new"
  },
  {
    name: "Commande en cours",
    description: "Voir le détail des commandes en cours",
    icon: "fire",
    bgColor: "#911d00",
    action: "orders"
  },
  {
    name: "Paiement commande",
    description: "Encaisser une commande",
    icon: "euro-sign",
    bgColor: "#009130",
    action: "payment-order"
  }
];

class App extends Component {

  handleClick = action => {
    this.props.history.push(action);
  }

  render() {

    /* le .map s'utilise sur un Array ce qui est notre cas
    si vous n'avez pas un Array sous la main mais un Object,
    il faut passer par Object.keys() avant d'utiliser la fonction map */
    const tilesDisplay = tiles.map(tile => (
      // pour le onClick ne pas oublier la fonction fléchée sinon la fonction associée au onClick s'éxécute immédiatement
      <Tile
        key={tile.action}
        name={tile.name}
        description={tile.description}
        icon={tile.icon}
        bgColor={tile.bgColor}
        action={() => this.handleClick(tile.action)} />
    ));

    return (
      <div className="App">
        <Header history={this.props.history} isHome={true} />

        <div className="tiles-wrapper">
          {tilesDisplay}
        </div>
      </div>
    );
  }
}

export default App;
