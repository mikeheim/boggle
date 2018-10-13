import React, { Component } from 'react';
import axios from 'axios';
import WordSearchForm from './WordSearchForm'
class BoggleContainer extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            boggleGrid: []
        }
    }

    /**
     * Get all the letters from the board
     */
    getDice(){
        //The 16 dice in boggle
        const DICE = [
            ['R', 'I', 'F', 'O', 'B', 'X'],
            ['I', 'F', 'E', 'H', 'E', 'Y'],
            ['D', 'E', 'N', 'O', 'W', 'S'],
            ['U', 'T', 'O', 'K', 'N', 'D'],
            ['H', 'M', 'S', 'R', 'A', 'O'],
            ['L', 'U', 'P', 'E', 'T', 'S'],
            ['A', 'C', 'I', 'T', 'O', 'A'],
            ['Y', 'L', 'G', 'K', 'U', 'E'],
            ['QU', 'B', 'M', 'J', 'O', 'A'],
            ['E', 'H', 'I', 'S', 'P', 'N'],
            ['V', 'E', 'T', 'I', 'G', 'N'],
            ['B', 'A', 'L', 'I', 'Y', 'T'],
            ['E', 'Z', 'A', 'V', 'N', 'D'],
            ['R', 'A', 'L', 'E', 'S', 'C'],
            ['U', 'W', 'I', 'L', 'R', 'G'],
            ['P', 'A', 'C', 'E', 'M', 'D']
        ]

        let shuffledDice = DICE;

        //Shuffle the dice
        for (let i = shuffledDice.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDice[i], shuffledDice[j]] = [shuffledDice[j], shuffledDice[i]];
        }
        
        //Get a letter from each dice
        let letters = [];
        for (let i = 0; i < shuffledDice.length; i++)
        {
            let die = shuffledDice[i];
            letters[i] = die[Math.floor(Math.random() * die.length)];;
        }
        return letters
    }

    /**
     * Generate a grid for our boggle game
     */
    generateBoggleGrid(){
        let grid = [];
        let letters = this.getDice();
        for(let i = 0; i < 4; i++)
        {
            grid[i] = [];
            for(let x = 0; x < 4; x++)
            {
                grid[i][x] = letters.pop();
            }
        }
        return grid;
    }

    componentWillMount(){
        this.setState({
            boggleGrid: this.generateBoggleGrid()
        })
    }

    /**
     * Call the Ruby API to search the grid for our word
     * 
     * @param {*} word 
     */
    searchWord(word)
    {
        if(word.length < 3)
        {
            alert("Word must be at least 3 characters long")
            return
        }

        //Build the request json
        let data = {}
        data.board = []
        data.word = word

        for(let i = 0; i < this.state.boggleGrid.length; i++)
        {
            data.board[i] = {};
            let row = [];
            for(let x = 0; x< this.state.boggleGrid.length; x++)
            {
                row[x] = this.state.boggleGrid[i][x];
            }
            data.board[i].row = row;
        }
        //Send to Ruby API
        axios.post('/api/v1/boggles', data)
        .then(response => {
            alert('Word found!')
            
        }).catch(error => {
            alert('Word not found!')
        })
        
    }
    render() {
        return (
            <div className="Boggle-container">
                <table className = "Boggle-table">
                    <tbody>
                    {
                        this.state.boggleGrid.map((row, index) => (
                            <tr key={row[0]}>
                                {row.map(cellId => <th key={cellId}>{cellId}</th>)}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <WordSearchForm onWordSearch={this.searchWord.bind(this)} />
            </div>
        )
    }
}

export default BoggleContainer;