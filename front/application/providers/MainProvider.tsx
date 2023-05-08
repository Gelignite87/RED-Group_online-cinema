import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import Layout from '@/components/layout/Layout'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import { store } from '@/store/store'

import AuthProvider from './AuthProvider/AuthProvider'
import HeadProvider from './HeadProvider/HeadProvider'
import ReduxToast from './ReduxToast'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, //отключаем запрос на сервер при смене фокуса
		},
	},
})

const MainProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component,
}) => {
	return (
		<HeadProvider>
			{/* подключаем nextjs-progressbar и favicon */}
			<Provider store={store}>
				{/* подключаем redux и store */}
				<QueryClientProvider client={queryClient}>
					{/* подключаем react-query */}
					<ReduxToast />
					<AuthProvider Component={Component}>
						{/* отслеживает поля isOnlyAdmin и isOnlyUser у компонентов, если их нет ничего не делает, если есть оборачивает всё в <DynamicCheckRole/> у которого выключен ssr*/}
						<Layout>
							{/* общее наполнение для всех страниц */}
							{children}
						</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}
export default MainProvider
