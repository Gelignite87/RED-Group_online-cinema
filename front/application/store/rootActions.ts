import * as userActions from './user/user.actions'

export const allActions = {
	//собираем все action в одном месте
	...userActions,
}
