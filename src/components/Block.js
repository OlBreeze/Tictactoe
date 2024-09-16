import React from 'react';

const Block = (props) => {
    return (
        <div>
            <div className={`block ${props.color}`} onClick={() => props.playGame(props.indexBlock)}>{props.symbol}</div>
        </div>
    );
};

export default Block;

