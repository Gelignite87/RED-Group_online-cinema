import { configureStore } from '@reduxjs/toolkit'

import { reducers } from './rootReducer'

export const store = configureStore({
	reducer: reducers,
	devTools: true, //коннект с расширением браузера
})

export type TypeRootState = ReturnType<typeof store.getState>
