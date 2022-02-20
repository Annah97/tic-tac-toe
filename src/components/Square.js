import React from 'react'
import "../App.css"
function Square({ val, chooseSquare }) {
    return (
        <div className="App-square" onClick={chooseSquare}>
            {val}
        </div>
    )
}

export default Square