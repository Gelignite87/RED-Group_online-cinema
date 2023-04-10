import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserService } from './user.service'
import { Controller, Get } from '@nestjs/common'
import { User } from './decorators/user.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth('user')
  async getProfile(@User('_id') _id: string) {
    return this.userService.buId(_id)
  }
}
