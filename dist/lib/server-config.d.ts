/// <reference types="minimist" />
export declare const serverConfig: {
    '--'?: string[] | undefined;
    _: string[];
    instance: string;
    port: {
        dev: number;
        prod: number;
    };
    base: string;
    sessionAge: number;
    secret: string;
    cookiePath: string;
    useCookie: boolean;
    httpOnly: boolean;
    templatePath: string;
    publicPath: string;
    maxAge: string;
    controlOrigin: string;
    allowMethods: string[];
    getPort(): number;
};
