import { axiosClassic } from 'api/interceptors'
import { FC, MouseEvent, useState } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

const TestAxiosButton: FC = () => {
	const [testAxios, setTestAxios] = useState('')

	const logout = async (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		const {
			data: { name },
		} = await axiosClassic.post(
			'http://localhost:3000/api/connect?prof=programmer',
			{ age: 23 }
		)
		setTestAxios(name)
	}

	return (
		<li className="flex flex-row">
			<MaterialIcon name="MdLogout" />
			<a onClick={logout}>
				<span>testAxios {testAxios}</span>
			</a>
		</li>
	)
}

export default TestAxiosButton
