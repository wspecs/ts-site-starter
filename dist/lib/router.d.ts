/// <reference types="express" />
import { Router } from 'express';
import { AppRequest, AppResponse } from './types';
export declare class BasicRoutes {
    basePath: string;
    templatePath: string;
    errorMessage: string;
    router: Router;
    constructor(basePath?: string, errorMessage404?: string, serverErrorMessage?: string);
    private initializeRouter(req, res, serverErrorMessage);
    private error(req, res);
    showError(res: AppResponse, code?: number, message?: string): void;
    getCookie(req: AppRequest, name: string): void;
    setCookie(req: AppRequest, name: string, value: string | number | boolean, options?: {}): void;
    renderLayout(page: string, renderFn: any): any;
    redirect(res: AppResponse, url: string): void;
    renderPage(path: string, page: string, renderFn: any): any;
    getRoutes(): Router;
}
