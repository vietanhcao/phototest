import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'
import { useSelector, useDispatch } from 'react-redux';


const updateUser = createAsyncThunk(
  'users/update',
  async (userData, { rejectWithValue }) => {
    const { id, ...fields } = userData
    try {
      const response = await userAPI.updateById(id, fields)
      return response.data.user
    } catch (err) {
      // Note: this is an example assuming the usage of axios. Other fetching libraries would likely have different implementations
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: {},
    error: null
  },
  reducers: {},
  extraReducers: {
    [updateUser.fullfilled]: (state, action) => {
      const user = action.payload
      state.entities[user.id] = user
    },
    [updateUser.rejected]: (state, action) => {
      if (action.payload) {
        // If a rejected action has a payload, it means that it was returned with rejectWithValue
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error
      }
    }
  }
})

const UsersComponent = () => {
  const { entities, error } = useSelector(state => state.users)
  const dispatch = useDispatch()

  // This is an example of an onSubmit handler using Formik meant to demonstrate accessing the payload of the rejected action
  const handleUpdateUser = async (values, formikHelpers) => {
    const resultAction = await dispatch(updateUser(values))
    if (updateUser.fulfilled.match(resultAction)) {
      const user = unwrapResult(resultAction)
      // showToast('success', `Updated ${user.name}`)
    } else {
      if (resultAction.payload) {
        // This is assuming the api returned a 400 error with a body of { errorMessage: 'Validation errors', field_errors: { field_name: 'Should be a string' } }
        formikHelpers.setErrors(resultAction.payload.field_errors)
      } else {
        // showToast('error', `Update failed: ${resultAction.error}`)
      }
    }
  }

  // render UI here
}