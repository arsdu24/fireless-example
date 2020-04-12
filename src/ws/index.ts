import { UserController } from './controllers/user.controller';
import { WS } from '@fireless/ws';

@WS.Module({
  options: {
    port: 3001,
  },
  controllers: [UserController],
})
export class Module {}
