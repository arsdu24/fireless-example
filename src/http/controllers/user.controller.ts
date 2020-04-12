import { HTTP, HttpRequest } from '@fireless/http';
import { User } from '../../database/enities/user.entity';
import { UserService } from '../../services/user.service';
import { merge } from 'lodash/fp';
import { WrapStringAsDataPipe } from '../../pipes/wrap-string-as-data.pipe';
import { ExtractStringFromDataPipe } from '../../pipes/extract-string-from-data.pipe';

interface ListRequest extends HttpRequest {
  query: {
    limit: number;
    offset: number;
  };
}

interface UserRequest extends HttpRequest {
  params: {
    id: string;
  };
}

interface UpdateRequest extends UserRequest {
  body: Partial<User>;
}

@HTTP.Controller('/users')
export class UserController {
  constructor(private userService: UserService) {
    void userService;
  }

  @HTTP.Get('/')
  list(
    @(HTTP.Request<ListRequest>().Query.limit()) limit = 100,
    @(HTTP.Request<ListRequest>().Query.offset()) offset = 0,
  ) {
    return this.userService.getAll(limit, offset);
  }

  @HTTP.Get('/:id')
  async getUser(
    @(HTTP.Request<UserRequest>().Params.id(
      WrapStringAsDataPipe,
      ExtractStringFromDataPipe,
    ))
    userId: string,
  ) {
    return await this.userService.getUserById(userId);
  }

  @HTTP.Put('/:id')
  async update(
    @(HTTP.Request<UpdateRequest>().Params.id()) userId: string,
    @(HTTP.Request<UpdateRequest>().Body()) data: Partial<User>,
  ) {
    const user: User | undefined = await this.userService.getUserById(userId);

    if (user) {
      await this.userService.save(merge(user, data));
    }

    return user;
  }
}
