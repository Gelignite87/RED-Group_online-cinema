import { FC } from 'react'

import styles from './Sidebar.module.sass'

const Sidebar: FC = () => {
	return (
		<div
			style={{
				backgroundColor: 'rgb(0,0,0,0.6)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div>Sidebar</div>
			<div>Sidebar</div>
			<div>Sidebar</div>
			<div>Sidebar</div>
			<div>Sidebar</div>
			<div>Sidebar</div>
		</div>
	)
}

export default Sidebar
