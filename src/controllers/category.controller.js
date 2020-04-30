const addNewCategory = async (req, res, service) => {
    const category = req.body;
    const NewCategory = await service.createCategory(category);
    res.send(NewCategory);
}
const updateCategory = async (req,res,service)=>{
    const category = req.body;
      const categories = await service.updateCategory(category)
      res.send(categories)
}


const getCategoryList = async (req, res, service) => {
    try {
        let categories;
        if (req.query.id) {
            const id = req.query.id;
           var data= await service.getCategoryById(id)
            
            categories = {
                message:"success",
                data:data,
                code:200
            }
            
        } else if (req.query.pageNo && req.query.rowPage) {
            console.log('rowpage')
            categories = await service.getAllCategoryPaging(req.query.pageNo, req.query.rowPage);
            console.log('categoris page',categories)
        } else {
            console.log('lainya')
            categories = await service.getAllCategory();
        }
        res.send(categories);
    } catch (e) {
        res.sendStatus(500);
    }
};
const deleteCategory = async(req,res,service)=>{
    var id=req.body.id
    const deleted =await service.deleteCategory(id);
    res.send(deleted)


} 

module.exports = {
    getCategoryList,
    addNewCategory,
    updateCategory,
    deleteCategory
};