"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = require("./server-config");
const fs_1 = require("fs");
const html_minifier_1 = require("html-minifier");
const mkdirp = require("mkdirp");
const ejs = require('ejs');
exports.minificationOptions = {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    decodeEntities: true,
    html5: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeComments: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
};
function resolveRequest(err, res, body = {}) {
    if (err) {
        res.statusCode = 500;
        res.send({ success: false });
    }
    else {
        res.send(Object.assign({}, body, { success: true }));
    }
}
exports.resolveRequest = resolveRequest;
;
function minifyResponse(res, name, data, cachePath) {
    const content = fs_1.readFileSync('templates/' + name + '.ejs', 'utf8');
    let html = html_minifier_1.minify(ejs.render(content, data, {
        filename: __dirname + '/../../templates/' + name,
    }), exports.minificationOptions);
    if (cachePath) {
        mkdirp(cachePath.substr(0, cachePath.lastIndexOf('/')), err => {
            fs_1.writeFileSync(cachePath, html, 'utf8');
            res.send(html);
        });
    }
    else {
        res.send(html);
    }
}
exports.minifyResponse = minifyResponse;
function serve(req, res) {
    res.serve = (name, options = {}) => {
        const config = req.serverConfig || server_config_1.serverConfig;
        const data = Object.assign({}, config, options);
        minifyResponse(res, name, data);
    };
}
exports.serve = serve;
function resolve(req, res) {
    res.resolve = (error, value) => {
        resolveRequest(error, res, value);
    };
}
exports.resolve = resolve;
