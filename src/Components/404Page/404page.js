import React from 'react';


const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '50vh'
}

const FourOfour = () => {
    return (
        <div style={styles}>
            <p style={{ fontSize: '16px' }}>Woof ,404 Page not found!</p>
        </div>
    )
}

export default FourOfour;