import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rooms: [],
  loading: false,
  error: false,
  refreshRooms: true
}

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    fetchingRooms: state => {
      state.loading = true
    },
    fetchedRooms: (state, action) => {
      state.loading = false
      state.rooms = action.payload
    },
    fetchedError: state => {
      state.loading = false
      state.error = true
    },
    refreshRoomsData: state => {
      state.refreshRooms = !state.refreshRooms
    }
  }
})

export const {
  fetchingRooms,
  fetchedRooms,
  fetchedError,
  refreshRoomsData
} = roomsSlice.actions
const roomsReducer = roomsSlice.reducer
export default roomsReducer
