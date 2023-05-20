import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SceletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import stylesForm from '@/ui/form-elements/admin-form.module.sass'
import SlugField from '@/ui/form-elements/slug-field/SlugField'
import UploadField from '@/ui/form-elements/upload-field/UploadField'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})
	const { onSubmit, isLoading } = useActorEdit(setValue)

	return (
		<Meta title="Edit actor">
			<AdminNavigation />
			<Heading title="Edit actor" />

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
							/>
							<SlugField
								register={register}
								generate={() =>
									setValue('slug', generateSlug(getValues('name')))
								}
								error={errors.slug}
							/>
							<Controller
								control={control}
								name="photo" //обращаемся к value с ключом photo
								defaultValue=""
								render={({
									field: { onChange, value }, //value берется из заранее определенных через setValue значений, onChange дает возможность менять value
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="actors"
										placeholder="Photo"
									/>
								)}
								rules={{
									validate: {
										required: (v) => v.length > 0 || 'Photo is required!',
									},
								}}
							/>
						</div>
						<p>Count movies: &nbsp;{getValues('countMovies')}</p>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default ActorEdit
