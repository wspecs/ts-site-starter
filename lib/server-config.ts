import * as args from 'args-finder';
import {readFileSync} from 'fs';

const DEFAULT_PORT = 1234;

let config = {
  instance: 'dev',
  port: {
    dev: DEFAULT_PORT,
    prod: 2345
  },
  base: '',
  sessionAge: 60,
  secret: 'secret',
  cookiePath: '/',
  useCookie: false,
  httpOnly: true,
  templatePath: 'templates',
  publicPath: 'public',
  maxAge: '31557600000',
  controlOrigin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  getPort() {
    if (this.instance === 'prod') {
      return this.port.prod || DEFAULT_PORT;
    }
    return this.port.dev || DEFAULT_PORT;
  }
};

if (args.options.config) {
  config = {...config, ...JSON.parse(readFileSync(
    String(args.options.config), 'utf8'))}
}

export const serverConfig = {...config, ...args.options};