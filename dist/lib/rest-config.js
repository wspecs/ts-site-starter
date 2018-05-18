"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router_config_1 = require("./router-config");
const server_config_1 = require("./server-config");
function configureRest(app, express) {
    // session limit in seconds
    if (server_config_1.serverConfig.sessionAge) {
        app.set('sessionAge', app.get('sessionAge') || server_config_1.serverConfig.sessionAge || 60);
    }
    if (server_config_1.serverConfig.secret) {
        app.set('secret', app.get('secret') || server_config_1.serverConfig.secret);
    }
    if (server_config_1.serverConfig.useCookie) {
        app.set('cookiePath', server_config_1.serverConfig.cookiePath || app.get('cookiePath') || '/');
        app.set('httpOnly', server_config_1.serverConfig.cookiePath || app.get('httpOnly'));
        app.locals.cookieOptions = {
            path: app.get('cookiePath'),
            maxAge: app.get('cookiePath'),
            httpOnly: app.get('httpOnly'),
        };
        /**
         * Add parser to get/set cookies.
         */
        app.use(cookieParser());
    }
    /**
     * Set the public path fo the application
     */
    app.set('publicPath', server_config_1.serverConfig.publicPath || app.get('publicPath'));
    app.set('maxAge', server_config_1.serverConfig.maxAge || app.get('maxAge'));
    if (!app.get('publicPath')) {
        throw new Error('public path is missing');
    }
    app.use(express.static(app.get('publicPath'), { maxAge: app.get('maxAge') }));
    console.log(__dirname);
    /**
     * Define default headers for the application.
     */
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', server_config_1.serverConfig.controlOrigin);
        res.setHeader('Access-Control-Allow-Methods', server_config_1.serverConfig.allowMethods.join(', '));
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
        res.setHeader('Date', (new Date()).toString());
        next();
    });
    /**
     * Initialize body parser for POST methods
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    /**
     * Set the view path for ejs render
     */
    app.set('templatePath', server_config_1.serverConfig.templatePath || app.get('templatePath'));
    if (!app.get('templatePath')) {
        throw new Error('template path is missing');
    }
    app.set('view engine', 'ejs');
    app.set('views', app.get('templatePath'));
    /**
     * Helper function to use with res.
     */
    app.use((req, res, next) => {
        router_config_1.resolve(req, res);
        router_config_1.serve(req, res);
        next();
    });
}
exports.configureRest = configureRest;
;
