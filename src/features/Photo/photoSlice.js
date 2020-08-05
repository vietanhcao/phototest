
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    title:"admin",
    categoryId:1,
    photo:"https://picsum.photos/id/702/300/300",
    datePicker:"2020-08-07T04:46:42.016Z",
    titleAntd:"dfsdf",
    password:"54Tamyduat",
    confirmPassword:"54Tamyduat",
    _id:1596602812249,
  },
]


const photo =  createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      // const newPhoto = action.payload
      state.push(action.payload)//mutate
    },

    removePhoto: (state, action) => {
      
      state = state.filter(photo => photo._id !== action.payload._id)
      return state; //must return
    },

    updatePhoto: (state, action) => {
      const photoIndex = state.findIndex(photo => photo._id === action.payload._id) 

      console.log(action.payload)
      
      if(photoIndex !== -1){
        state[photoIndex] = action.payload
      }
    }
  }
})

const { reducer, actions } = photo;

export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;

