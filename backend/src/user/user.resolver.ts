import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { UserService } from './user.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

type RequestWithUser = Request & {
  user: {
    id: string;
  };
};

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async updateAvatar(
    @Args('avatarUrl') avatarUrl: string,
    @Context()
    context: {
      req: RequestWithUser;
    },
  ) {
    const userId = context.req.user.id;

    const user = await this.userService.updateAvatar(userId, avatarUrl);

    return user.avatarUrl;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => String, {
    nullable: true,
  })
  async userAvatar(@Context() context: { req: RequestWithUser }) {
    const userId = context.req.user.id;

    return this.userService.getAvatar(userId);
  }
}
