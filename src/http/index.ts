import { UserController } from './controllers/user.controller';
import { HTTP } from '@fireless/http';

@HTTP.Module({
  port: 3000,
  controllers: [UserController],
})
export class Module {}
