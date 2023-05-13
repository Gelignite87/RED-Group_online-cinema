import { FC } from 'react'
import { useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SceletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import FieldForwardRef from '@/ui/form-elements/FieldForwardRef'
import stylesForm from '@/ui/form-elements/admin-form.module.sass'
import SlugField from '@/ui/form-elements/slug-field/SlugField'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

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
			<form onSubmit={handleSubmit(onSubmit)} className={stylesForm.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={stylesForm.fields}>
							<Field
								register={register('name', { required: 'Name is required!' })}
								placeholder="Name"
								error={errors.name}
								style={{ width: '31%' }}
							/>
							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
									error={errors.slug}
								/>
							</div>
							<FieldForwardRef
								{...register('icon', { required: 'Icon is required!' })} //принимает в себя name и options
								placeholder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>
							<Button>Update</Button>
						</div>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
