const express = require('express');
const router = express.Router();
const CategoryService = require('../services/category.service');
const {getCategoryList,addNewCategory,updateCategory,deleteCategory} = require("../controllers/category.controller");
const tokenValidation = require('../middlewares/token-validation');

const categoryService = new CategoryService();

router.use(tokenValidation);
router.get('/', (req, res, next) => getCategoryList(req, res, categoryService));
router.post('/',(req,res,next) =>  addNewCategory(req,res,categoryService));
router.put('/',(req,res,next)=>updateCategory(req,res,categoryService));
router.delete('/',(req,res,next)=>deleteCategory(req,res,categoryService));

 
module.exports = router;