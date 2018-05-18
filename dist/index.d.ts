import { configureRest } from './lib/rest-config';
import * as routerConfig from './lib/router-config';
import { BasicRoutes } from './lib/router';
import { serverConfig } from './lib/server-config';
import { AppRequest, AppResponse } from './lib/types';
import { handlerDecorator } from './lib/utils';
export { AppRequest, AppResponse, BasicRoutes, configureRest, routerConfig, serverConfig, handlerDecorator };
