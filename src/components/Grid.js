import React, { Component } from 'react';
import { shuffle } from 'lodash';
import Card from './Card';

class Grid extends Component {
    state;
    previousCard;
    cards;
    matches = 0;
    words = [
        'cowgirl',
        'cactus',
        'heat',
        'sand',
        'fire',
        'lizard',
        'prickly pear',
        'agave'
    ];

    constructor() {
        super();
        this.checkFlippedCard = this.checkFlippedCard.bind(this);
        this.state = {loading: false};
        this.cards = this.getShuffledPairs();
    }

    getShuffledPairs() {
        return shuffle(this.words.concat(this.words)).map(word => word);
    }

    checkFlippedCard(word, hideCard) {
        if (!this.previousCard) {
            this.previousCard = {word, hideCard};
        } else if (this.previousCard.word === word) {
            this.matches++;
            hideCard(false, true);
            this.previousCard.hideCard(true, true);
            this.previousCard = null;
        } else {
            this.setState({loading: true});

            hideCard(false, false);
            this.previousCard.hideCard(true, false);
            this.previousCard = null;

            this.setState({loading: false});
        }
    }

    render() {
        const grid = this.cards.map((word, i) => <Card word={word} key={i} checkWin={this.checkFlippedCard}
                                                       loading={this.state.loading}></Card>);

        return (
            <div className="Grid">{grid}</div>
        )
    }
}

export default Grid;