import React, {Component} from 'react';
import Block from "./Block";
import {arrayWinner, bestStep, possibleMoves} from "../utils/constants";

class GameArea extends Component {
    constructor(props) {
        super(props);
        this.gameOver = false;
        this.symbolHuman = 'X';
        this.symbolComputer = 'O';
        this.counter = 1;
        this.winsComputer = 0;
        this.winsHuman = 0;
        this.numberSteps = 0;

        this.state = {
            blocks: Array.from({length: 9}, () => ({color: "black", value: null}))
        };
    }

    render() {
        const message = this.gameOver ? `Game over!` : `Game ${this.counter}`;
        const rate = `You ${this.winsHuman} : CPU ${this.winsComputer}`
        return (
            <div className={'wrapper'}>
                <h1>{message}</h1>
                <h1>{rate}</h1>
                <div className={'container'}>
                    {this.state.blocks.map((element, index) => (
                        <Block color={element.color} key={index} indexBlock={index} symbol={element.value}
                               playGame={this.handleClick}/>
                    ))}
                </div>
                <button className="glow-on-hover" onClick={this.handleNewGame}>New game</button>
            </div>
        );
    }

    // New Game
    handleNewGame = () => {
        if (this.numberSteps !== 0) {
            this.gameOver = false;
            this.counter++;
            this.numberSteps = 0;

            const newBlocks = Array.from({length: 9}, () => ({color: "black", value: null}));
            this.setState({blocks: newBlocks});
        }
    };

    // After the player's move, the computer's next move.
    // After each move there is a check for victory.
    // If “Win”, highlight winning moves in red.

    handleClick = (index) => {
        if (this.state.blocks[index].value !== null || this.gameOver)
            return;

        this.doStepUser(index)
            .then(() => this.doStepCPU(index))
            .then(res => console.log(res))
            .catch(reason => console.log(reason));

    }


    doStepUser(index) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                try {
                    let updatedBlocks = this.state.blocks.map((el, i) => {
                        if (i === index && el.value === null) {
                            return {...el, value: this.symbolHuman};
                        }
                        return el;
                    })

                    this.numberSteps++;

                    if (this.numberSteps >= 3)
                        this.checkWinner(updatedBlocks);

                    this.setState({blocks: updatedBlocks});

                    if (this.numberSteps === 9)
                        this.gameOver = true;

                    resolve('The user walked successfully');
                } catch (e) {
                    reject(e);
                }
            }, 50)
        })

    }

    doStepCPU(index) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!this.gameOver) {
                        const indexComputer = this.getIndexBlockForComputer(index);
                        let updatedBlocks2 = this.state.blocks.map((el, i) => {
                            if (+i === +indexComputer && el.value === null) {
                                return {...el, value: this.symbolComputer};
                            }
                            return el;
                        })

                        this.numberSteps++;

                        if (this.numberSteps >= 5)
                            this.checkWinner(updatedBlocks2);

                        this.setState({blocks: updatedBlocks2});

                        if (this.numberSteps === 9)
                            this.gameOver = true;

                        resolve('The computer walked successfully');
                    }
                } catch (e) {
                    reject(e);
                }
            }, 400)
        })

    }

   // get the block index for the computer move
    getIndexBlockForComputer = (indHuman) => {

        // check for computer's move
        for (const [key] of Object.entries(bestStep)) {
            for (const arrayBestStep of bestStep[key]) {
                if (+key !== indHuman && this.state.blocks[key].value === null
                    && this.state.blocks[arrayBestStep[0]].value === this.symbolComputer
                    && this.state.blocks[arrayBestStep[1]].value === this.symbolComputer) {
                             return +key;
                }
            }
        }

        // check for user's move
        const arrayBestSteps = bestStep[indHuman];
        for (const arrayBestStep of arrayBestSteps) {

            if (this.state.blocks[arrayBestStep[0]].value !== null && this.state.blocks[arrayBestStep[1]].value === null && this.state.blocks[arrayBestStep[0]].value === this.symbolHuman)
                return arrayBestStep[1];

            if (this.state.blocks[arrayBestStep[1]].value !== null && this.state.blocks[arrayBestStep[0]].value === null && this.state.blocks[arrayBestStep[1]].value === this.symbolHuman)
                return arrayBestStep[0];
        }

        let freeBlocks = this.state.blocks
            .map((el, index) => el.value === null ? index : null)
            .filter(index => index !== null);

        if (indHuman !== 4 && this.state.blocks[4].value === null)//2-й шаг
        {
            const random = Math.random();
            return random < 0.5 ? 4 : freeBlocks[0]; // 4 - это середка (хочу иногда середку, иногда любую свободную)
        }

        const arrayPossibleMoves = possibleMoves[indHuman];
        for (const ind of arrayPossibleMoves) {
            if (this.state.blocks[ind].value === null)
                return ind;
        }

        return freeBlocks[0];
    }


    checkWinner = (updatedBlocks) => {
        if (this.gameOver)
            return updatedBlocks;

        const arr = updatedBlocks.map(block => block.value);

        for (let i = 0; i < arrayWinner.length; i++) {
            const [a1, a2, a3] = arrayWinner[i];
            if (arr[a1] && arr[a1] === arr[a2] && arr[a2] === arr[a3]) {
                if (arr[a1] === this.symbolHuman) {
                    this.winsHuman++;
                } else
                    this.winsComputer++;

                this.gameOver = true;

                updatedBlocks[a1].color = 'red';
                updatedBlocks[a2].color = 'red';
                updatedBlocks[a3].color = 'red';

                return updatedBlocks;
            }
        }
    }
}

export default GameArea;