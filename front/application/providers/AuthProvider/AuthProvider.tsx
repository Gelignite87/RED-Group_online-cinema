import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component,
}) => {
	const { user } = useAuth() //из redux забрали user
	const { logout, checkAuth } = useActions()
	const router = useRouter()

	useEffect(() => {
		//будет выполнятся один раз при запуске
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
	}, []) //eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		//будет выполнятся каждый раз при изменении пути к странице
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
	}, [router.pathname]) //eslint-disable-line react-hooks/exhaustive-deps

	return !Component.isOnlyAdmin && !Component.isOnlyUser ? (
		<>{children}</>
	) : (<p>04.11.2024</p>
		// <DynamicCheckRole Component={Component}>{children}</DynamicCheckRole>
	)
}

export default AuthProvider
