/**
 * HelloRepository
 * 
 * Hello機能のデータベースアクセスを担当
 */

const { DataTypes } = require('sequelize');
let sequelize;
let HelloModel;

/**
 * HelloRepositoryクラス
 * DBアクセスロジックを実装
 */
class HelloRepository {
    /**
     * 初期化（DI）
     * 
     * @param {Sequelize} db - Sequelizeインスタンス
     */
    static initialize(db) {
        sequelize = db;
        
        // Helloモデル定義
        HelloModel = sequelize.define('Hello', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            message: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            timestamps: false,
            tableName: 'hello'
        });
    }

    /**
     * 最新のHelloレコードを取得
     * 
     * @returns {Promise<Object>} Helloレコード
     */
    static async findLatest() {
        return await HelloModel.findOne({
            order: [['id', 'DESC']]
        });
    }

    /**
     * IDでHelloレコードを取得
     * 
     * @param {number} id - レコードID
     * @returns {Promise<Object>} Helloレコード
     */
    static async findById(id) {
        return await HelloModel.findByPk(id);
    }

    /**
     * 全てのHelloレコードを取得
     * 
     * @returns {Promise<Array>} Helloレコード配列
     */
    static async findAll() {
        return await HelloModel.findAll({
            order: [['id', 'DESC']]
        });
    }

    /**
     * Helloレコードを作成
     * 
     * @param {Object} data - レコードデータ
     * @returns {Promise<Object>} 作成されたHelloレコード
     */
    static async create(data, options = {}) {
        return await HelloModel.create({
            message: data.message
        }, options);
    }

    /**
     * Helloレコードを更新
     * 
     * @param {number} id - レコードID
     * @param {Object} data - 更新データ
     * @returns {Promise<Object>} 更新されたHelloレコード
     */
    static async update(id, data, options = {}) {
        const record = await this.findById(id);
        if (!record) {
            return null;
        }
        return await record.update(data, options);
    }

    /**
     * Helloレコードを削除
     * 
     * @param {number} id - レコードID
     * @returns {Promise<boolean>} 削除成功時true
     */
    static async delete(id, options = {}) {
        const record = await this.findById(id);
        if (!record) {
            return false;
        }
        await record.destroy(options);
        return true;
    }

    /**
     * Helloモデルを取得
     * 
     * @returns {Model} Sequelizeモデル
     */
    static getModel() {
        return HelloModel;
    }
}

module.exports = HelloRepository;
