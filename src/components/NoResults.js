import React from 'react';

const NoResults = (props) => {
    return(
        props.loading? <h1> LOADING.. </h1> : <h1>There were no results..</h1>
  
    )
}

export default NoResults;