import cn from 'classnames'
import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/ui/SceletonLoader'

import { AdminService } from '@/services/admin.service'

import styles from '../Admin.module.sass'

const CountUsers: FC = () => {
	const { isLoading, data } = useQuery('Count users', () =>
		AdminService.getCountUsers()
	)
	return (
		<div className={cn(styles.block, styles.countUsers)}>
			<div className="w-1/5">
				{isLoading ? (
					<SkeletonLoader className="h-16" />
				) : (
					<div className={styles.number}>{data?.data}</div>
				)}
				<div className={styles.description}>users</div>
			</div>
		</div>
	)
}

export default CountUsers
