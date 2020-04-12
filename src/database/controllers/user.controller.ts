import { DB } from '@fireless/database';
import { User } from '../enities/user.entity';
import { UserService } from '../../services/user.service';

@DB.Controller(User)
export class UserController {
  constructor(private userService: UserService) {}

  @DB.OnUpdate()
  list(@(DB.Event<User>().Entity()) user: User) {
    user.fullName = `Nu asa repede ${user.fullName}`;

    return this.userService.save(user);
  }
}
