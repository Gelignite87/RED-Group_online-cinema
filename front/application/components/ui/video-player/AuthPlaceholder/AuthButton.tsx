import Link from 'next/link'
import { FC } from 'react'

import styles from './AuthPlaceholder.module.sass'

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
	return (
		<Link href={`/auth?redirect=/movie/${slug}`} className={styles.btn}>
			Sign in
		</Link>
	)
}

export default AuthButton
