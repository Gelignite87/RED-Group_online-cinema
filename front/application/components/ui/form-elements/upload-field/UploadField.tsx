import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'

import SkeletonLoader from '@/ui/SceletonLoader'
import styles from '@/ui/form-elements/form.module.sass'

import { IUploadField } from '../form.interface'

import { useUpload } from './useUpload'

const UploadField: FC<IUploadField> = ({
	onChange,
	placeholder,
	error,
	folder,
	isNoImage = false,
	style,
	value,
}) => {
	const { uploadFile, isLoading } = useUpload(onChange, folder)

	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input
						type="file"
						onChange={uploadFile} //при изменении input через onChange, который находится внутри uploadFile, записывается новый value
						disabled={isLoading}
					/>
					{error && <div className={styles.error}>{error.message}</div>}
				</label>
				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className="w-full h-full" />
						) : (
							value && <Image alt="" src={value} fill />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
