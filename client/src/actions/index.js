export const addEnergy = (name,value) => ({
  type: 'ADD_ENERGY',
  name,
  value
});

export const getEnergy = (energyList) => ({
  type: 'GET_ENERGY',
  energyList
});

export const postEnergy = (name,value) => ({
  type: 'POST_ENERGY',
  name,
  value
});


