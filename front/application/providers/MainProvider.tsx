import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import Layout from '@/components/layout/Layout'

import { store } from '@/store/store'

import HeadProvider from './HeadProvider/HeadProvider'
import ReduxToast from './ReduxToast'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, //отключаем запрос на сервер при смене фокуса
		},
	},
})

const MainProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<HeadProvider>
			{/* подключаем nextjs-progressbar и favicon */}
			<Provider store={store}>
				{/* подключаем redux и store */}
				<QueryClientProvider client={queryClient}>
					{/* подключаем react-query */}
					<ReduxToast />
					<Layout>
						{/* общее наполнение для всех страниц */}
						{children}
					</Layout>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}
export default MainProvider
