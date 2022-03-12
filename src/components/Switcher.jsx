import React from "react";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        placeContent:'center',
        width: '2.5rem',
        height: '2.5rem',
        // marginLeft: '-0.0625rem'
        marginRight: '-0.0625rem'

    },
    unChecked: {
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '0.3125rem',
        background: 'white',
        border: '0.0625rem solid #DDDDDD',
        padding: 0,
        overflow: 'hidden',
    },
    checked: {
        background: '#FFD205',
        border: 0,
        padding: 0,
        borderRadius: '0.3125rem',
        width: '2.125rem',
        height: '2.125rem',
        margin: '0.1875rem 0 0.1875rem 0',
        overflow: 'hidden'
    }
}));

export const Switcher = ({onClick , label, array, setter, fieldIndex, max, isCorrect}) => {
    const classes = useStyles()
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked(!checked);
        onClick(label, array, setter, fieldIndex)
        
    }
    return (
        <div className={classes.root}>
            <button
                onClick={handleChange}
                className={checked? classes.checked : classes.unChecked}
                style={isCorrect ? {background: 'green'} : {}}
                disabled={array.length === max && !checked ? 'disabled' :  ''}
            >
                {label}
            </button>
        </div>
        
    );
};