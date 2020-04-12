import { User } from '../../database/enities/user.entity';
import { UserService } from '../../services/user.service';
import { merge } from 'lodash/fp';
import { WS } from '@fireless/ws';

interface ListEventData {
  limit: number;
  offset: number;
}

interface GetUserEventData {
  userId: number;
}

interface UpdateEventData {
  userId: string;
  data: Partial<User>;
}

@WS.Controller('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @WS.Handler({
    type: 'list',
    pipeResponse: true,
  })
  list(
    @(WS.Event<ListEventData>().Data.limit()) limit = 100,
    @(WS.Event<ListEventData>().Data.offset()) offset = 0,
  ) {
    return this.userService.getAll(limit, offset);
  }

  @WS.Handler({
    type: 'findOneById',
    pipeResponse: true,
  })
  async getUser(@(WS.Event<GetUserEventData>().Data.userId()) userId: string) {
    return await this.userService.getUserById(userId);
  }

  @WS.Handler({
    type: 'updateById',
    pipeResponse: true,
  })
  async update(
    @(WS.Event<UpdateEventData>().Data.userId()) userId: string,
    @(WS.Event<UpdateEventData>().Data.data()) data: Partial<User>,
  ) {
    const user: User | undefined = await this.userService.getUserById(userId);

    if (user) {
      await this.userService.save(merge(user, data));
    }

    return user;
  }
}
