import { createApplication } from '@fireless/core';
import { Module as Database } from './database';
import { Module as Http } from './http';
import { Module as WS } from './ws';

createApplication([Database, Http, WS]).then(() => {
  console.log('uraaaaaaa');
});
