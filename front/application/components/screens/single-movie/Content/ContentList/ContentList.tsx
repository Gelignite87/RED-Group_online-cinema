import Link from 'next/link'
import { FC, Fragment } from 'react'

import { IContentList } from '../content.interface'

import styles from './ContentList.module.sass'

const ContentList: FC<IContentList> = ({ links, name }) => {
	return (
		<div className={styles.list}>
			<div className={styles.name}>{name}</div>
			<div className={styles.links}>
				{links.map((l, i) => (
					<Fragment key={i}>
						<Link href={l.link}>{l.title}</Link>
						{i + 1 === links.length ? '' : ', '}
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default ContentList
