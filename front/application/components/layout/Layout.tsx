import { FC, PropsWithChildren } from 'react'

import styles from './LayoutFlex.module.sass'
import Mandala from './Mandala/Mandala'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<Mandala />
			<div className={styles.layout}>
				<Navigation />
				<div className={styles.center}>{children}</div>
				<Sidebar />
			</div>
			<div className={styles.footer_center}>
				<h1>FOOTER</h1>
			</div>
		</div>
	)
}

export default Layout
