import { reducer as toastrReducer } from 'react-redux-toastr'

// import { reducer as userReducer } from './user/user.slice'
import { userSlice } from './user/user.slice'

export const reducers = {
	user: userSlice.reducer,
	toastr: toastrReducer, //toastrReducer обязательно должен быть последним
}
