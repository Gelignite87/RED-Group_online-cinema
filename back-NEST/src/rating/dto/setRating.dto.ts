import { IsNumber, Length } from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'
import { Types } from 'mongoose'

export class SetRatingDto {
  @Length(24, 24)
  @IsObjectId({ message: 'This is not Types.ObjectId' })
  movieId: Types.ObjectId

  @IsNumber()
  value: number
}
