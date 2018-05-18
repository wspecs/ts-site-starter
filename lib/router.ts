import {Router, NextFunction} from 'express';
import {AppRequest, AppResponse} from './types';
import {Response} from 'express';
import * as Cookies from 'cookies';

const PAGE_NOT_FOUND = 'Oops, the page you\'re looking for is missing.';
const SERVER_ERROR = 'Something went wrong!';

export class BasicRoutes {

  basePath = '';
  templatePath = '';
  errorMessage: string;
  router: Router;

  constructor(basePath: string = '', errorMessage404=PAGE_NOT_FOUND, serverErrorMessage=SERVER_ERROR) {
      this.basePath = basePath;
      this.errorMessage = errorMessage404;
      this.router = Router();
      this.router.use((req: any, res: any, next: NextFunction) => {
        this.initializeRouter(req, res, serverErrorMessage);
        next();
      });
  }

  private initializeRouter(req: AppRequest, res: AppResponse, serverErrorMessage: string) {
    if (this.basePath) {
      req.basePath = '/' + this.basePath;
      this.templatePath = this.basePath + '/';
    } else {
      req.basePath = this.basePath;
    }
    req.cookies = new Cookies(req as any, res as any);
    req.errorFunction = this.showError;
    req.serverErrorMessage = serverErrorMessage;
  }

  private error(req: AppRequest, res: AppResponse) {
    return this.showError(res, 404);
  }

  showError(res: AppResponse, code=404, message=this.errorMessage) {
    const page = {error: {code, message}};
    res.status(code)
    res.serve(this.templatePath + 'error', page);
  }

  getCookie(req: AppRequest, name: string) {
    req.cookies.get(name);
  }

  setCookie(req: AppRequest, name: string, value: string|number|boolean,
    options={}) {
    req.cookies.set(name, value, {
      httpOnly: true,
      path: '/' + this.basePath,
      ...options,
    });
  }

  renderLayout(page: string, renderFn: any) {
    return this.renderPage(this.templatePath + 'layout', page, renderFn);
  }

  redirect(res: AppResponse, url: string) {
    res.redirect('/' + this.templatePath + url);
  }

  renderPage(path: string, page: string, renderFn: any) {
    return renderFn(path, page);
  }

  getRoutes() {
    this.router.get('*', this.error.bind(this));
    return this.router;
  }
}