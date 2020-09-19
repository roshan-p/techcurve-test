const initialState = {
    inputEnergyName: "",
    inputEnergyValue: 0,
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
let electricityCopy = {};
let solarCopy = {};
let gasCopy = {};
let windCopy = {};
let ListCopy = {};
let inputEnergyName = ""


const EnergyAction = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ENERGY':
            inputEnergyName = action.name;
            let valueFomrPercentage = (maximumTotalEnergy * action.value / 100);
            let newState = {}
            let newTotalEnergy = 0;
            const index = state.energyList.findIndex(post => post.name === action.name)

            if (action.value === 0 || !action.value) {
                for (let i = 0; i < ListCopy.length; i++) {
                    console.log(newTotalEnergy)
                    let totalVal = (maximumTotalEnergy * ListCopy[i].value / 100)
                    newTotalEnergy = newTotalEnergy + totalVal;

                }
                let currentEnergy = electricity;

                if (action.name === 'ec') {
                    electricity = electricityCopy
                    currentEnergy = { electricity }
                }
                if (action.name === 'sl') {
                    solar = solarCopy;
                    currentEnergy = { solar }
                }
                if (action.name === 'wn') {
                    wind = windCopy;
                    currentEnergy = { wind }
                }
                if (action.name === 'gs') {
                    gas = gasCopy;
                    currentEnergy = { gas }
                }

                return Object.assign({}, state, { ...state, inputEnergyName: action.name, inputEnergyNameValue: 0, ...currentEnergy, totalEnergy: newTotalEnergy })

            }

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
            } else {
                newList.push({ name: action.name, value: action.value, thb: (valueFomrPercentage * 0.13) / 10, valueFomrPercentage })
            }

            let selectedEnergy = electricity;
            if (action.name === 'ec') {
                electricity = {
                    energy: valueFomrPercentage,
                    price: (valueFomrPercentage * 0.13) / 10,
                    value: action.value

                }
                selectedEnergy = { electricity }
            }
            if (action.name === 'wn') {
                wind = {
                    energy: valueFomrPercentage,
                    price: (valueFomrPercentage * 0.13) / 10,
                    value: action.value


                }
                selectedEnergy = { wind }
            }
            if (action.name === 'sl') {
                solar = {
                    energy: valueFomrPercentage,
                    price: (valueFomrPercentage * 0.13) / 10,
                    value: action.value

                }
                selectedEnergy = { solar }
            }
            if (action.name === 'gs') {
                gas = {
                    energy: valueFomrPercentage,
                    price: (valueFomrPercentage * 0.13) / 10,
                    value: action.value

                }
                selectedEnergy = { gas }
            }
            energyList = newList;
            for (let i = 0; i < energyList.length; i++) {
                let totalVal = (maximumTotalEnergy * energyList[i].value / 100)
                newTotalEnergy = newTotalEnergy + totalVal;
            }


            newState = Object.assign({}, state, { ...selectedEnergy }, { energyList }, { inputEnergyName: action.name },{ inputEnergyValue: action.value }, { totalEnergy: newTotalEnergy })

            return newState;

        case 'GET_ENERGY':
            let dataList = [...action.energyList];

            for (let i = 0; i < dataList.length; i++) {
                let valueFomrPercentage = (maximumTotalEnergy * dataList[i].value / 100)
                let thb = (valueFomrPercentage * 0.13) / 10;
                console.log(totalEnergy)
                totalEnergy = totalEnergy + valueFomrPercentage;
                console.log(totalEnergy)
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
            gasCopy = gas;
            windCopy = wind;
            electricityCopy = electricity;
            solarCopy = solar;
            ListCopy = energyList
            const energyState = Object.assign({}, state, { ListCopy }, { energyList }, { totalEnergy }, { gas }, { wind }, { electricity }, { solar }, { gasCopy }, { windCopy }, { electricityCopy }, { solarCopy })
            return energyState;

        case 'POST_ENERGY':
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