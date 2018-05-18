# ts-site-starter

![npm](https://img.shields.io/npm/v/ts-site-starter.svg) ![license](https://img.shields.io/npm/l/ts-site-starter.svg) ![github-issues](https://img.shields.io/github/issues/wspecs/ts-site-starter.svg)



![nodei.co](https://nodei.co/npm/ts-site-starter.png?downloads=true&downloadRank=true&stars=true)

![travis-status](https://img.shields.io/travis/wspecs/ts-site-starter.svg)
![stars](https://img.shields.io/github/stars/wspecs/ts-site-starter.svg)
![forks](https://img.shields.io/github/forks/wspecs/ts-site-starter.svg)

![forks](https://img.shields.io/github/forks/wspecs/ts-site-starter.svg)

![](https://david-dm.org/wspecs/ts-site-starter/status.svg)
![](https://david-dm.org/wspecs/ts-site-starter/dev-status.svg)

## Features

- Parse text with chords

## Usage

```js
// lib/app-routes.ts
const siteStarter = require('tsm.name');

import {AppResponse, BasicRoutes} from 'ts-site-starter';
import {Request} from 'express';

export class AppRoutes extends BasicRoutes {
  constructor(basePath: string) {
    super(basePath);
    this.addRoutes();
  }

  homePage(req: Request, res: AppResponse) {
    res.serve('home', {});
  }

  addRoutes() {
    this.router.get('/', this.homePage.bind(this));
  }
}

// index.ts
import * as express from "express";
import * as log from 'great-logs';
import { configureRest, serverConfig } from 'ts-site-starter';
import { AppRoutes } from './lib/app-routes';

/**
 * The server.
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Constructor.
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();
    configureRest(this.app, express);
  }

  routeApp() {
    const routes = (new AppRoutes('')).getRoutes();
    this.app.use(routes);
  }

  start() {
    this.routeApp();
    const port = serverConfig.getPort();
    this.app.listen(port, function () {
      log.info('port: %s', port);
      log.info('url: %s', serverConfig.base);
    });
  }
}

// Start the application
new Server().start();
```

## Install

`npm install --save ts-site-starter`


## Scripts

 - **npm run build** : `rm -rf dist && tsc`
 - **npm run dev** : `npm run build:all && node dist/index.js`
 - **npm run test** : `mocha ./dist/test/*.js`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser) | ^1.4.1 | ✖
[@types/cookies](https://www.npmjs.com/package/@types/cookies) | ^0.7.1 | ✖
[@types/express](https://www.npmjs.com/package/@types/express) | ^4.11.1 | ✖
[@types/html-minifier](https://www.npmjs.com/package/@types/html-minifier) | ^3.5.2 | ✖
[@types/mkdirp](https://www.npmjs.com/package/@types/mkdirp) | ^0.5.2 | ✖
[@types/node](https://www.npmjs.com/package/@types/node) | ^10.0.4 | ✖
[args-finder](https://www.npmjs.com/package/args-finder) | 0.0.3 | ✖
[body-parser](https://www.npmjs.com/package/body-parser) | ^1.18.2 | ✖
[cookie-parser](https://www.npmjs.com/package/cookie-parser) | ^1.4.3 | ✖
[cookies](https://www.npmjs.com/package/cookies) | ^0.7.1 | ✖
[ejs](https://www.npmjs.com/package/ejs) | ^2.6.1 | ✖
[express](https://www.npmjs.com/package/express) | ^4.16.3 | ✖
[great-logs](https://www.npmjs.com/package/great-logs) | 0.0.4 | ✖
[html-minifier](https://www.npmjs.com/package/html-minifier) | ^3.5.15 | ✖
[mkdirp](https://www.npmjs.com/package/mkdirp) | ^0.5.1 | ✖
[path](https://www.npmjs.com/package/path) | ^0.12.7 | ✖
[@types/chai](https://www.npmjs.com/package/@types/chai) | ^4.1.3 | ✔
[@types/mocha](https://www.npmjs.com/package/@types/mocha) | ^5.2.0 | ✔
[@types/source-map](https://www.npmjs.com/package/@types/source-map) | ^0.5.7 | ✔
[chai](https://www.npmjs.com/package/chai) | ^4.1.2 | ✔
[mocha](https://www.npmjs.com/package/mocha) | ^5.1.1 | ✔
[source-map](https://www.npmjs.com/package/source-map) | ^0.7.2 | ✔


## Contributing

Contributions welcome; Please submit all pull requests against the master branch. If your pull request contains TypeScript patches or features, you should include relevant unit tests. Please check the [Contributing Guidelines](contributng.md) for more details. Thanks!

## Author

Wendly Saintil <wendlysaintil@gmail.com> https://twitter.com/wendlysaintil

## License

 - **MIT** : http://opensource.org/licenses/MIT