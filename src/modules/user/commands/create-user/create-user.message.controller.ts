import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

import { IdResponse } from '@libs/api/id.response.dto';

import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './create-user.request.dto';

@Controller()
export class CreateUserMessageController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('user.create') // <- Subscribe to a microservice message
  async create(message: CreateUserRequestDto): Promise<IdResponse> {
    const command = new CreateUserCommand(message);

    const id = await this.commandBus.execute(command);

    return new IdResponse(id.unwrap());
  }
}
