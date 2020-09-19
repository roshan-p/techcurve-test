import { combineReducers } from 'redux'
import energyReducer from './energy'

const reducer = combineReducers({
     energyRc:energyReducer
})

export default reducer