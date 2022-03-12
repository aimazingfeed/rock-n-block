import React, { useState } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import magicWand from '../logo/magic-wand.svg'
import { Switcher } from './Switcher'
import axios from 'axios'

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



const LotteryTicket = () => {
    const classes = useStyles()
    const [checked, setChecked] = useState({ firstField: [], secondField: []})
    const randomedValues = { firstField: new Set(), secondField: new Set([])}
    const [winningValues, setWinningValues] = useState({ firstField: [], secondField: []})
    
    const getRandomedArray = (min, max, num, id) => {
        if (id === '1') {
            randomedValues.firstField.clear()
            while (randomedValues.firstField.size < num) {
                randomedValues.firstField.add(Math.floor(min + Math.random() * (max - min)))
            }
        } else if ( id === '2' ) {
            randomedValues.secondField.clear()
            while (randomedValues.secondField.size < num) {
                randomedValues.secondField.add(Math.floor(min + Math.random() * (max - min)))
            }
        }
    }
    
    const getWinner = (checkedValues, randomedValues) => {
        const firstFieldMatches = Array.from(randomedValues.firstField).filter(
            item => checkedValues.firstField.indexOf(item) !== -1)
        const firstConditionMatch = firstFieldMatches.length > 3
        const secondFieldMatches = Array.from(randomedValues.secondField).filter(
            item => checkedValues.secondField.indexOf(item) !== -1)
        const secondConditionMatch = firstFieldMatches.length > 2 && secondFieldMatches.length > 0
        if (firstConditionMatch || secondConditionMatch) {
            alert('MATCH!!!!!!!!!!')
            setWinningValues({firstField: firstFieldMatches, secondField: secondFieldMatches})
            return true
        } else {
            alert("It's a pity")
            setWinningValues({firstField: firstFieldMatches, secondField: secondFieldMatches})
            return false
        }

    }

    const handleChange = (id, checkedArray, setter, fieldIndex) => {
        setWinningValues({ firstField: [], secondField: []})
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

    const handleSubmit = async () => {
        if (checked.firstField.length === 8
            && checked.secondField.length === 1) {
                getRandomedArray(1, 20, 8, '1')
                getRandomedArray(1, 3, 1, '2')
                const data = {
                    selectedNumber: { 
                        firstField: checked.firstField, 
                        secondField: checked.secondField 
                    },
                    isTicketWon: false
                }
                data.isTicketWon = getWinner(checked, randomedValues)
                
                
                await sendData({num: 0, data: data})
            }
        
        
    }
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const sendData = async ({num, data}) => {
        await timeout(2000)
        const numRetry = num + 1
        console.log(data, numRetry)
        return await axios.post('URL/rock-block', {data}).then(answer => Promise.resolve(answer))
            .catch(response => {
                if (numRetry > 2) {
                    if (response.response) { 
                        alert('Страница не найдена или истекло время ожидания')
                    } else if (response.request) { 
                        alert('Ошибка сети')
                    }
                } else {
                    return sendData({num: numRetry, data: data})
                } 
            });
    }
    const firstFields = []
    const secondFields = []
    for (let i = 0; i < 19; i++) {
        firstFields.push(
            <Switcher 
                label={i+1}
                key={`$first_${i+1}`}
                onClick={handleChange}
                array={checked.firstField}
                max={8} setter={setChecked}
                fieldIndex={'1'}
                isCorrect={winningValues.firstField.find((item) => i+1 === item)}
            />)
    }
    for (let j = 0; j < 2; j++) {
        secondFields.push(
            <Switcher
                label={j+1}
                key={`second_${j+1}`}
                onClick={handleChange} 
                array={checked.secondField}
                max={1}
                setter={setChecked}
                fieldIndex={'2'}
                isCorrect={winningValues.secondField.find((item) => j+1 === item)}
                
            />)
            
                
        }
    
    return (
        <div className={classes.root}>
            <div className={classes.field}>
                <div className={classes.header}>
                    <Typography className={classes.typography}> 
                        Билет 1
                    </Typography>
                    <img src={magicWand} alt='Magic wand' onClick={() => 
                        {getRandomedArray(1, 20, 8, '1'), getRandomedArray(1, 3, 1, '2')}}/>
                </div>
                <div className={classes.body}>
                    <div className={classes.firstField}>
                        <div className={classes.subHeader}>
                            <Typography className={classes.typographySubHead}> 
                                Поле 1
                            </Typography>
                            <Typography className={classes.typographySubDescription}>
                                Отметьте 8 чисел
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