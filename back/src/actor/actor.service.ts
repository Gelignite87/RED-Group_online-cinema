import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ActorModel } from './actor.model'
import { ActorDto } from './actor.dto'

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>
  ) {}

  async bySlug(slug: string) {
    const doc = await this.ActorModel.findOne({ slug }).exec()
    if (!doc) throw new NotFoundException('Actor not found!')
    return doc
  }

  async getAll(searchTerm?: string) {
    let options = {}
    if (searchTerm)
      options = {
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { slug: new RegExp(searchTerm, 'i') },
        ],
      }
    return this.ActorModel.find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec()
  }

  /* Admin place */

  async byId(_id: string) {
    const genre = await this.ActorModel.findById(_id)
    if (!genre) throw new NotFoundException('Actor not found!')
    return genre
  }

  async create() {
    const defaultValue: ActorDto = {
      name: '',
      slug: '',
      photo: '',
    }
    const genre = await this.ActorModel.create(defaultValue)
    return genre._id
  }

  async update(_id: string, dto: ActorDto) {
    const updateGenre = await this.ActorModel.findByIdAndUpdate(_id, dto, {
      new: true, //new: true означает что findByIdAndUpdate возвращает новую версию
    }).exec()
    if (!updateGenre) throw new NotFoundException('Actor not found!')
    return updateGenre
  }

  async delete(id: string) {
    const deleteGenre = await this.ActorModel.findByIdAndDelete(id).exec()
    if (!deleteGenre) throw new NotFoundException('Actor not found!')
    return deleteGenre
  }
}
