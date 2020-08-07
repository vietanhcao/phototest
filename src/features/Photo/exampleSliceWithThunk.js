import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'
import { useSelector, useDispatch } from 'react-redux';

const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().users
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return
    }
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    loading: 'idle',
    currentRequestId: undefined,
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [fetchUserById.fulfilled]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities.push(action.payload)
        state.currentRequestId = undefined
      }
    },
    [fetchUserById.rejected]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    }
  }
})

const UsersComponent = () => {
  const { users, loading, error } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const fetchOneUser = async userId => {
    try {
      const resultAction = await dispatch(fetchUserById(userId))
      const user = unwrapResult(resultAction)
      // showToast('success', `Fetched ${user.name}`)
    } catch (err) {
      // showToast('error', `Fetch failed: ${err.message}`)
    }
  }

  // render UI here
}