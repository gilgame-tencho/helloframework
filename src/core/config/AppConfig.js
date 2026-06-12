/**
 * Express App Configuration
 * 
 * Expressアプリケーション設定
 */

const express = require('express');
const path = require('path');

/**
 * Expressアプリケーションを作成・設定
 * 
 * @returns {Express.Application} 設定済みExpressアプリケーション
 */
function createApp() {
    const app = express();

    // ミドルウェア設定
    // JSON パーサー
    app.use(express.json());

    // URL エンコード済みボディパーサー
    app.use(express.urlencoded({ extended: true }));
    app.use('/public', express.static(path.join(__dirname, '../../public')));

    // CORSミドルウェア（必要に応じて）
    // app.use(cors());

    // ロギングミドルウェア（必要に応じて）
    // app.use(morgan('dev'));

    return app;
}

module.exports = {
    createApp
};
