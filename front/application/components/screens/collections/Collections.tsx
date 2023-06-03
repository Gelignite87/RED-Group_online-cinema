import { FC } from 'react'

import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import CollectionItem from './CollectionItem'
import styles from './Collections.module.sass'
import { ICollection } from './collections.interface'

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<Meta
			title="Discovery"
			description="In this page you can find all genres on our site"
		>
			<Heading title="Discovery" className={styles.heading} />
			<section className={styles.collections}>
				{collections.map((c) => (
					<CollectionItem key={c._id} collection={c} />
				))}
			</section>
		</Meta>
	)
}

export default Collections
