import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component: { isOnlyAdmin, isOnlyUser },
}) => {
	const { user } = useAuth()

	const router = useRouter()

	const Children = () => <>{children}</>

	if (user?.isAdmin) {
		//на этом этапе админы получили все компоненты, независимо от прописанных свойств
		return <Children />
	}

	if (isOnlyAdmin) {
		// в компоненте прописано свойство .isOnlyAdmin = true
		router.pathname !== '/404' && router.replace('/404')
		//используем replace вместо push чтобы запрос не учитывался в истории браузера, по стрелке назад мы получим предыдущую страницу, до запроса
		return null
	}

	const isUser = user && !user.isAdmin //если есть user и он не isAdmin то он isUser
	if (isUser && isOnlyUser) {
		//если пользователь isUser и в компоненте указано свойство .isOnlyUser = true
		return <Children />
	} else {
		router.pathname !== '/auth' && router.replace('/auth')
		//используем replace вместо push чтобы запрос не учитывался в истории браузера, по стрелке назад мы получим предыдущую страницу, до запроса
		return null
	}
}

export default CheckRole
