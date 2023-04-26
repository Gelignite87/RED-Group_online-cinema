import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, //отключаем запрос на сервер при смене фокуса
		},
	},
})

const MainProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
export default MainProvider
