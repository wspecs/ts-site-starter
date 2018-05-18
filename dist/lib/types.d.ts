/// <reference types="express" />
import { Request, Response } from 'express';
export interface AppRequest extends Request {
    adminSession?: {
        user: any;
    };
    basePath?: string;
    errorFunction: (res: AppResponse, code: number, message: string) => void;
    user?: any;
    serverErrorMessage: string;
    serverConfig?: {};
    userTable?: any;
}
export interface AppResponse extends Response {
    resolve: (error: Error, value: {}) => (void | Promise<void>);
    serve: (name: string, options: {}) => (void | Promise<void>);
}
export interface Map<T = any> {
    [key: string]: T;
}
