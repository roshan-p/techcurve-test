const initialState = {
    inputEnergy: {
        name: "",
        value: 0
    },
    energyList: [],
    maximumTotalEnergy: 3299652.65,
    totalEnergy: 0,
    hours: 15796.1255,
    electricity: {
        energy: 0,
        price: 0,
    },
    solar: {
        energy: 0,
        price: 0,
    },
    gas: {
        energy: 0,
        price: 0,
    },
    wind: {
        energy: 0,
        price: 0,
    }

};
const maximumTotalEnergy = 3299652.65;
let totalEnergy = 0;
let energyList = [];
let electricity = {};
let solar = {};
let gas = {};
let wind = {};


const EnergyAction = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ENERGY':
            //  energyList = state.energyList.map((item) => (
            //     item.name === action.name ? { ...item, ...action } : item
            // ))
            let newState = {}
            let valueFomrPercentage = (maximumTotalEnergy * action.value / 100)
            let newTotalEnergy = 0; 
            const index = state.energyList.findIndex(post => post.name === action.name)
            let newList = energyList;
            if (index != -1) {
                newList = [
                    ...state.energyList.slice(0, index), // everything before current post
                    {
                        ...state.energyList[index],
                        value: action.value
                    },
                    ...state.energyList.slice(index + 1), // everything after current post
                ]
            }else{
                newList.push({ name: action.name, value: action.value,thb: (valueFomrPercentage * 0.13) / 10,valueFomrPercentage})
            }
          
         
            for (let i = 0; i < energyList.length; i++) {
                let totalVal = (maximumTotalEnergy * energyList[i].value / 100)
                newTotalEnergy = newTotalEnergy + totalVal;

            }
           
            if (action.name === 'ec') {
                newState = Object.assign({}, state, {
                    inputEnergy: {
                        name: action.name,
                        value: action.value
                    },

                    electricity: {
                        energy: valueFomrPercentage,
                        price: (valueFomrPercentage * 0.13) / 10,
                        value: action.value

                    },
                    energyList: newList,
                    totalEnergy: newTotalEnergy
                })
            }
            if (action.name === 'wn') {
                newState = Object.assign({}, state, {
                    inputEnergy: {
                        name: action.name,
                        value: action.value
                    },

                    wind: {
                        energy: valueFomrPercentage,
                        price: (valueFomrPercentage * 0.13) / 10,
                        value: action.value


                    },
                    energyList: newList,
                    totalEnergy: newTotalEnergy
                })
            }
            if (action.name === 'sl') {
                newState = Object.assign({}, state, {
                    inputEnergy: {
                        name: action.name,
                        value: action.value
                    },

                    solar: {
                        energy: valueFomrPercentage,
                        price: (valueFomrPercentage * 0.13) / 10,
                        value: action.value

                    },
                    energyList,
                    totalEnergy: newTotalEnergy
                })
            }
            if (action.name === 'gs') {
                newState = Object.assign({}, state, {
                    inputEnergy: {
                        name: action.name,
                        value: action.value
                    },

                    gas: {
                        energy: valueFomrPercentage,
                        price: (valueFomrPercentage * 0.13) / 10,
                        value: action.value

                    },
                    energyList,
                    totalEnergy: newTotalEnergy
                })
            }
            return newState;

        case 'GET_ENERGY':
            let dataList = [...action.energyList];

            for (let i = 0; i < dataList.length; i++) {
                let valueFomrPercentage = (maximumTotalEnergy * dataList[i].value / 100)
                let thb = (valueFomrPercentage * 0.13) / 10;
                totalEnergy = totalEnergy + valueFomrPercentage;
                energyList.push({
                    _id: dataList[i]._id,
                    value: dataList[i].value,
                    name: dataList[i].name,
                    valueFomrPercentage: valueFomrPercentage,
                    thb: thb
                })
                if (dataList[i].name === 'ec') {
                    electricity = {
                        energy: valueFomrPercentage,
                        price: thb,
                        value: dataList[i].value,
                    }

                }
                if (dataList[i].name === 'wn') {
                    wind = {
                        energy: valueFomrPercentage,
                        price: thb,
                        value: dataList[i].value,
                    }
                }
                if (dataList[i].name === 'sl') {
                    solar = {
                        energy: valueFomrPercentage,
                        price: thb,
                        value: dataList[i].value,
                    }

                }
                if (dataList[i].name === 'gs') {
                    gas = {
                        energy: valueFomrPercentage,
                        price: thb,
                        value: dataList[i].value,
                    }

                }


            }
            const energyState = Object.assign({}, state, { energyList }, { totalEnergy }, { gas }, { wind }, { electricity }, { solar })
            return energyState;

        case 'POST_ENERGY':
            console.log('POST')
            console.log(action)
            fetch('http://localhost:4001/api/addData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: action.name,
                    value: action.value,
                })
            })
            return state;
        default:
            return state;

    }
}

export default EnergyAction