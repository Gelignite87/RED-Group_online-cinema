import Link from 'next/link'
import { FC } from 'react'

import CollectionImage from './CollectionImage'
import styles from './Collections.module.sass'
import { ICollection } from './collections.interface'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={`/genre/${collection.slug}`} className={styles.collection}>
			<div className={`${styles.behind} ${styles.third}`}>
				<CollectionImage collection={collection} />
			</div>
			<div className={`${styles.behind} ${styles.second}`}>
				<CollectionImage collection={collection} />
			</div>
			<CollectionImage collection={collection} />
			<div className={styles.content}>
				<div className={styles.title}>{collection.title}</div>
			</div>
		</Link>
	)
}

export default CollectionItem
