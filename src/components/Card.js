import React, { Component } from 'react';
import anime from 'animejs'

class Card extends Component {
    isHidden = true;
    element;
    timeline;

    showCard() {
        this.timeline = anime.timeline();
        this.timeline.add({
            targets: this.element,
            rotateY: [{value: '180deg'}],
            begin:  () => {this.toggleClass()}
        });
    }

    hideOrStarCard(onlyPlayLast, isMatch) {
        if (onlyPlayLast) {
            this.timeline.children = [];
        }
        if (isMatch) {
            this.timeline.add({
                targets: this.element.firstElementChild,
                opacity: 1,
                offset: 0,
                scale: [0, 1.3, 0.8],
                easing: 'easeInOutQuart'
            })
        } else {
            this.timeline.add({
                targets: this.element,
                rotateY: [{value: '0deg'}],
                delay: 100,
                begin: () => {
                    this.toggleClass()
                }
            })
        }
    }

    handleClick(event) {
        if (this.props.loading || !this.isHidden) return;

        this.setElement(event);
        this.showCard();

        this.props.checkWin(this.props.word, this.hideOrStarCard.bind(this));
    }

    setElement(event) {
        if (!this.element) {
            this.element = event.currentTarget;
        }
    }

    toggleClass() {
        this.element.classList.toggle('flipped');
        this.isHidden = !this.element.classList.contains('flipped');
    }

    render() {
        return (
            <div className="Card" onClick={this.handleClick.bind(this)}>
                <svg viewBox="0 0 200 200" id="star">
                    <polygon points="100,10 30,198 210,78 0,78 180,198" />
                </svg>
                <div className="emoji">🌵</div>
                <div className="word">{this.props.word}</div>
            </div>
        )
    }
}

export default Card;