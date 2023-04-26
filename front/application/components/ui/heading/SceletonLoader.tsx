import cn from 'classnames'
import { FC } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SceletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
	return (
		<Skeleton
			{...rest}
			baseColor="#27282A"
			highlightColor="#474747"
			className={cn('rounded-lg', className)}
		/>
	)
}
export default SceletonLoader
