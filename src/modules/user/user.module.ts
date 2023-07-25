import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserCliController } from './commands/create-user/create-user.cli.controller';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { CreateUserMessageController } from './commands/create-user/create-user.message.controller';
import { CreateUserService } from './commands/create-user/create-user.service';
import { CreateUserGraphqlResolver } from './commands/create-user/graphql-example/create-user.graphql-resolver';
import { DeleteUserHttpController } from './commands/delete-user/delete-user.http-controller';
import { DeleteUserService } from './commands/delete-user/delete-user.service';
import { UserRepository } from './database/user.repository';
import { FindUsersGraphqlResolver } from './queries/find-users/find-users.graphql-resolver';
import { FindUsersHttpController } from './queries/find-users/find-users.http.controller';
import { FindUsersQueryHandler } from './queries/find-users/find-users.query-handler';
import { USER_REPOSITORY } from './user.di-tokens';
import { UserMapper } from './user.mapper';

const httpControllers = [
  CreateUserHttpController,
  DeleteUserHttpController,
  FindUsersHttpController,
];

const messageControllers = [CreateUserMessageController];

const cliControllers: Provider[] = [CreateUserCliController];

const graphqlResolvers: Provider[] = [
  CreateUserGraphqlResolver,
  FindUsersGraphqlResolver,
];

const commandHandlers: Provider[] = [CreateUserService, DeleteUserService];

const queryHandlers: Provider[] = [FindUsersQueryHandler];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    Logger,
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class UserModule {}
