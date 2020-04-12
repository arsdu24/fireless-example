import { DB } from '@fireless/database';
import { UserController } from './controllers/user.controller';

@DB.Module({
  options: {
    uri:
      'mongodb+srv://hoho:busamAX7Ydhz8S6j@mongodb-js-odm-5bxpi.azure.mongodb.net/alioha?retryWrites=true&w=majority',
  },
  controllers: [UserController],
})
export class Module {}
