const logEvent = require('../events/myEmitter');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const sequelize = require('../../dbConn');
const { QueryTypes } = require('sequelize');

class ProductService {
    async getAllProduct() {
        let result;
        try {
            // result = await Product.findAll();
            result = await Product.findAll({include: Category});
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-PRODUCT-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }

    async getAllProductPaging(offset, limit) {
        let result;
        try {
            // result = await Product.findAll();
            result = await Product.findAndCountAll({offset: Number(offset), limit: Number(limit)});
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-PRODUCT-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }

    async getProductById(id) {
        let result;
        try {
            // result = await Product.findAll();
            result = await Product.findAll({
                where: { id: id },
                include: [{ model: Category, as: "category" }] ///< include used to eager-load associated model 
              })
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-PRODUCT-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }

    async createProduct(product) {
        let result
        try {
             result = await Product.create(product)

            
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'CREATE-PRODUCT-SERVICE-FAILED',
                logMessage: e
            });
            
        }
       
    }

    async updateProduct(product) {
        const productdata = await Product.findByPk(product.id);
        

        productdata.productCode=product.productCode,
        productdata.productName=product.productName,
        productdata.categoryId
        
        let result;
        
        try {
            result = await productdata.save();
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'UPDATE-PRODUCT-SERVICE-FAILED',
                logMessage: e
            });
        }
        return result;
    }

    async deleteProduct(productId) {
        
        let result;
        try{
            const productdata = await Product.findByPk(productId);
        
        
       
        try {
            result = await productdata.destroy();
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'DELETE-PRODUCT-SERVICE-FAILED',
                logMessage: e
            });
        }}catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'FIND-PRODUCT-SERVICE-FAILED',
                logMessage: e
            });
        }
        return result;
    }
}

module.exports = ProductService;