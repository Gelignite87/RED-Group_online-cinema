import { FC, MouseEvent } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import { useActions } from '@/hooks/useActions'

const LogoutButton: FC = () => {
	const { logout } = useActions()

	const handleLogout = (event: MouseEvent) => {
		event.preventDefault() //отменяем стандартное поведение тега <a></a>
		logout() //стираем пользователя из LocalStorage и токены из cookies
	}

	return (
		<li>
			<a href="/no-path" onClick={handleLogout}>
				<MaterialIcon name="MdLogout" />
				<span>Logout</span>
			</a>
		</li>
	)
}
export default LogoutButton
