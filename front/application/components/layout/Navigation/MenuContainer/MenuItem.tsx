import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import styles from './Menu.module.sass'
import { IMenuItem } from './menu.interface'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { asPath } = useRouter()
	return (
		<li
			className={cn({
				[styles.active]: asPath === item.link,
				[styles.activeAdmin]:
					asPath.includes('/manage') && item.link.includes('/manage'),
			})}
		>
			<Link href={item.link}>
				<MaterialIcon //динамические иконки
					name={item.icon}
				/>
				<span>{item.title}</span>
			</Link>
		</li>
	)
}
export default MenuItem
