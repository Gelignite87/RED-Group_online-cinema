import { FC } from 'react'

import styles from './Layout.module.sass'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

const Layout: FC = ({}) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.center}>{}</div>
			<Sidebar />
		</div>
	)
}

export default Layout
