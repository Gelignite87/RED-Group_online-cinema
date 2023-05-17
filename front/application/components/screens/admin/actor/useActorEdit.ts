import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { getAdminUrl } from '@/config/url.config'

import { ActorService } from '@/services/actor.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IActorEditInput } from './actor-edit.interface'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push, query } = useRouter()

	const actorId = String(query.id) //оборачиваем в String на случай если придёт undefined

	const { isLoading } = useQuery(
		['actor', actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess({ data }) {
				// console.log(getKeys(data).map((key) => ({ [key]: data[key] })))

				getKeys(data).forEach((key) => {
					//из ключей собираем массив
					setValue(key, data[key]) //setValue формирует массив объектов к которым можно получить доступ через register(key, options) или getValue(key)
				})
			},
			onError(err) {
				toastrError(err, 'Get actor')
			},
			enabled: !!query.id, //срабатывает только если есть query.id
		}
	)

	const { mutateAsync: mutateActor } = useMutation(
		'update actor',
		(data: IActorEditInput) => ActorService.update(actorId, data),
		{
			onError(err) {
				toastrError(err, 'Update actor')
			},
			onSuccess() {
				toastr.success('Update actor', 'actor successfully updated')
				push(getAdminUrl('actors'))
			},
		}
	)

	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateActor(data)
	}

	return { onSubmit, isLoading }
}
