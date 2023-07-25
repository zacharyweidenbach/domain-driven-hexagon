import { Field, ObjectType } from '@nestjs/graphql';

import { UserGraphqlResponseDto } from './user.graphql-response.dto';

import { PaginatedGraphqlResponse } from '../../../../libs/api/graphql/paginated.graphql-response.base';

@ObjectType()
export class UserPaginatedGraphqlResponseDto extends PaginatedGraphqlResponse(
  UserGraphqlResponseDto,
) {
  @Field(() => [UserGraphqlResponseDto])
  data: UserGraphqlResponseDto[];
}
