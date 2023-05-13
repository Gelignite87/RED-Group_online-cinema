import { FC } from 'react'
import { useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SceletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Field from '@/ui/form-elements/Field'
import FieldForwardRef from '@/ui/form-elements/FieldForwardRef'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import styles from './GenreEdit.module.sass'
import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})
	const { onSubmit, isLoading } = useGenreEdit(setValue)
	return (
		<Meta title="Edit genre">
			<AdminNavigation />
			<Heading title="Edit genre" />
			<form onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div>
							<Field
								name="name"
								register={register}
								options={{ required: 'Name is required!' }}
								placeholder="Name"
								error={errors.name}
								style={{ width: '31%' }}
							/>
							<div style={{ width: '31%' }}></div>
							<FieldForwardRef
								{...register('icon', { required: 'Icon is required!' })} //принимает в себя name и options
								placeholder="Icon"
								error={errors.name}
								style={{ width: '31%' }}
							/>
							<button>Update</button>
						</div>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
