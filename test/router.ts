import {BasicRoutes} from '../lib/router';
import { expect } from 'chai';

describe('word parser', () => {
  let appRouter: BasicRoutes;
  beforeEach(() => {
    appRouter = new BasicRoutes();
  });

  it('initializes', () => {
    expect(appRouter.basePath).to.equal('');
    expect(appRouter.templatePath).to.equal('');
  });
});
