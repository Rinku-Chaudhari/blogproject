import React from 'react';

const Input = (props) => {
    let data = null;
    switch (props.elementType) {
        case 'input':
            data = <input type={props.elementType}
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig} />
            break;

        default:
            return;
    }

    return data;
}

export default Input;