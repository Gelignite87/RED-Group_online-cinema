import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import ClientOnly from '@/utils/client-only'

import { getAdminHomeUrl } from '@/config/url.config'

import MenuItem from '../MenuItem'

import LogoutButton from './LogoutButton'

const AuthItems: FC = () => {
	const { user } = useAuth()

	return (
		<ClientOnly>
			{user ? (
				<>
					<MenuItem
						item={{
							icon: 'MdSettings',
							link: '/profile',
							title: 'Profile',
						}}
					/>
					<LogoutButton />
					{user?.isAdmin && (
						<MenuItem
							item={{
								icon: 'MdOutlineLock',
								link: getAdminHomeUrl(),
								title: 'Admin panel',
							}}
						/>
					)}
				</>
			) : (
				<MenuItem
					item={{
						icon: 'MdLogin',
						link: '/auth',
						title: 'Login',
					}}
				/>
			)}
		</ClientOnly>
	)
}

export default AuthItems
