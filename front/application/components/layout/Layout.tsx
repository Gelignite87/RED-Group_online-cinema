import { FC, PropsWithChildren } from 'react'

import styles from './LayoutFlex.module.sass'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<>
			<div className={styles.layout}>
				<Navigation />
				<div className={styles.center}>{children}</div>
				<Sidebar />
			</div>
			<div className={styles.footer_center}>
				<h1>FOOTER</h1>
			</div>
		</>
	)
}

export default Layout
