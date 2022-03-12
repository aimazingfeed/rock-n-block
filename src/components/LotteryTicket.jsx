import { useState } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import magicWand from '../logo/magic-wand.svg'
import { Switcher } from './Switcher'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: '37.6875rem',
        width: '20rem',
        background: 'linear-gradient(#4568DC,#B06AB3)',
    },
    field: {
        background: 'white',
        margin: '1.0625rem 0.75rem 13.625rem 0.75rem',
        width: '18.5rem',
        height: '23rem',
        overflowY: 'auto'
    },
    typographyHead: {
        fontFamily: 'Roboto'
    },
    typographySubHead: {
        marginRight: '0.5rem',
        fontSize: '0.875rem',
        fontFamily: 'Roboto'
    },
    typographySubDescription: {
        marginRight: '0.5rem',
        fontFamily: 'Roboto',
        fontWeight: '300',
        fontSize: '0.875rem'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0.875rem 0.8125rem 0 1rem'
    }, 
    body: {
        margin: '0.75rem 0.8125rem 0 1rem',
        display: 'flex',
        flexDirection: 'column'
    },
    firstField: {
        display: 'flex',
        flexDirection: 'column'
    },
    subHeader: {
        display: 'flex',
        flexDirection: 'row'
    },
    subBody: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        fontSize: '0.875rem',
        fontFamily: 'Roboto',
        fontWeight: '400',
        margin: '1.4375rem',
        borderRadius: '2.5rem',
        background: 'white',
        border: '0.0625rem solid #DDDDDD',
        padding: 0,
        overflow: 'hidden',
        width: '11.125rem',
        height: '2.6875rem'
    }

}))



const LotteryTicket = (props) => {
    const classes = useStyles()
    const [checked, setChecked] = useState({ firstField: [], secondField: []})
    const randomedNumbers = { firstField: new Set(), secondField: new Set([])}
    
    const getRandomedArrays = (min, max, num, id) => {
        if (id === '1') {
            while (randomedNumbers.firstField.size < num) {
                randomedNumbers.firstField.add(Math.floor(min + Math.random() * (max - min)))
            }
        } else if ( id === '2' ) {
            while (randomedNumbers.secondField.size < num) {
                randomedNumbers.secondField.add(Math.floor(min + Math.random() * (max - min)))
            }
        }
    }
    
    

    const handleChange = (id, checkedArray, setter, fieldIndex) => {
        let newArray = [...checkedArray]
        if (checkedArray.includes(id)) {
            newArray = newArray.filter(value => value !== id)
        } else {
            newArray.push(id)
        }
        if (fieldIndex === '1') {
            setter({...checked, firstField: newArray.sort((a, b) => a-b)})
        }  else {
            setter({...checked, secondField: newArray})
        }
    }
    
    const handleSubmit = () => {
        getRandomedArrays(1, 20, 8, '1')
        getRandomedArrays(1, 3, 1, '2')
        console.log(randomedNumbers.firstField, randomedNumbers.secondField)
        console.log(checked.firstField, checked.secondField)

    }

    const firstFields = []
    for (let i = 0; i < 19; i++) {
        firstFields.push(<Switcher label={i+1} key={`$first_${i+1}`} onClick={handleChange} 
            array={checked.firstField} max={8} setter={setChecked} fieldIndex={'1'}/>)
    }
    const secondFields = []
    for (let j = 0; j < 2; j++) {
        secondFields.push(<Switcher label={j+1} key={`second_${j+1}`} onClick={handleChange} 
            array={checked.secondField} max={1} setter={setChecked} fieldIndex={'2'}/>)
    }

    
    return (
        <div className={classes.root}>
            <div className={classes.field}>
                <div className={classes.header}>
                    <Typography className={classes.typography}> 
                        Билет 1
                    </Typography>
                    <img src={magicWand} alt='Magic wand'/>
                </div>
                <div className={classes.body}>
                    <div className={classes.firstField}>
                        <div className={classes.subHeader}>
                            <Typography className={classes.typographySubHead}> 
                                Поле 1
                            </Typography>
                            <Typography className={classes.typographySubDescription}>
                                Отметье 8 чисел
                            </Typography>
                        </div>
                        <div className={classes.subBody}>
                            {firstFields}
                        </div>
                    </div>
                    <div className={classes.firstField}>
                        <div className={classes.subHeader}>
                            <Typography className={classes.typographySubHead}> 
                                Поле 2
                            </Typography>
                            <Typography className={classes.typographySubDescription}>
                                Отметье 1 число
                            </Typography>
                        </div>
                        <div className={classes.subBody}>
                            {secondFields}
                        </div>
                    </div>
                    <button
                        className={classes.button}
                        onClick={handleSubmit}
                    >
                        Показать результат
                    </button>
                </div>
            </div> 
        </div>
    )
}
export default LotteryTicket