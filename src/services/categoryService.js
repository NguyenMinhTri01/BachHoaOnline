import groupCategory_M from "../models/group_category.model";
import category_M from "../models/category.model";
import slug from "url-slug"
import {transSuccess, transErrors} from "../../lang/vi"





let createNewGroup = (gc_name) => {
  return new Promise(async (resolve, reject) => {
    let urlSlug = slug(gc_name, {
      separator: '_',
      transformer: false
    }).toLowerCase();
  
    let item = {
      gc_name : gc_name,
      gc_slug : urlSlug
    }
    if (!await groupCategory_M.findBySlug(urlSlug)){
      let result = await groupCategory_M.createNew(item);
      if (result){
        return resolve( {
          type : true,
          message : transSuccess.add_data_successful    
        });
      }
    }
    return resolve({
      type : false,
      message : transErrors.add_data_failed
    });      
  })
};


let createNewcategory = (object) => {
  return new Promise (async(resolve, reject) =>{
    let urlSlug = slug(object.c_name, {
      separator: '_',
      transformer: false
    }).toLowerCase();
    let c_parentArr = object.c_parent.split("__");
    let item = {
      c_name : object.c_name,
      c_slug : urlSlug,
      c_parent: {
        id: c_parentArr[0].trim(),
        gc_name: c_parentArr[1].trim()
      },
    }
    if(!await category_M.findBySlug(urlSlug)){
      let category = await category_M.createNew(item);
      if (category){
        let objectCategory = {
          id : category._id,
          c_name : category.c_name,
        }
        await groupCategory_M.addCategoryIntoGroup(c_parentArr[0].trim(), objectCategory)
        return resolve( {
          type : true,
          message : transSuccess.add_data_successful    
        });      
      }
    }
    return resolve({
      type : false,
      message : transErrors.add_data_failed
    });      
  })
};

let getListGroups = () => {
  return new Promise(async(resolve, reject) => {
    let result = await groupCategory_M.findAll();
    if(result){
      return resolve(result);
    }
  })
};

let getListCategories = () => {
  return new Promise(async(resolve, reject) => {
    let result = await category_M.findAll();
    if(result){
      return resolve(result);
    }
  })
};

let deleteCategory = (id, parentId) => {
  return new Promise(async(resolve, reject) => {
    let resultFromGroup = await groupCategory_M.deleteCategoryInGroup(parentId, id);
    let resultFromCategory = await category_M.deleteCategory(id);
    if (resultFromGroup && resultFromCategory){
      return resolve({
        type : true,
        //message : transSuccess.remove_data_successful    
      }); 
    }
    return resolve({
      type : false,
      //message : transErrors.remove_data_failed
    })
  })
};

let deleteGroup = (groupId) => {
  return new Promise(async(resolve, reject) => {
    let result = await groupCategory_M.deleteGroupById(groupId);
    await category_M.deleteCategoryOfGroup(groupId);
    if (result){
      return resolve({
        type : true,
        //message : transSuccess.remove_data_successful    
      }); 
    }
    return resolve({
      type : false,
      //message : transErrors.remove_data_failed
    })
  })
};

let getOneCategory = (id) => {
  return new Promise(async(resolve, reject) => {
    let category = await category_M.findCategoryById(id);
    if (category){
      resolve(category);
    }
  })
};


let updateGroupCategory = (group) => {
  return new Promise(async(resolve, reject) => {
    let groupId = group._id;
    let urlSlug = slug(group.gc_name, {
      separator: '_',
      transformer: false
    }).toLowerCase();
  
    let item = {
      gc_name : group.gc_name,
      gc_slug : urlSlug
    };    
    let result = await groupCategory_M.updateGroupById(groupId, item);
    if (result){
      await category_M.updateCategoriesOfGroup(groupId, group.gc_name);
      return resolve({
        type : true,
        message : transSuccess.update_data_successful    
      });      
    }
    return resolve( {
      type : false,
      //message : transSuccess.add_data_successful    
    });        
  })
}


let updateCategory = (object) => {
  return new Promise (async(resolve, reject) => {
    let id = object._id;
    let urlSlug = slug(object.c_name, {
      separator: '_',
      transformer: false
    }).toLowerCase();
    let c_parentArr = object.c_parent.split("__");
    let newCategory = {
      c_name : object.c_name,
      c_slug : urlSlug,
      c_parent: {
        id: c_parentArr[0].trim(),
        gc_name: c_parentArr[1].trim()
      },
      c_updatedAt: Date.now()
    }
    let oldCategory = await category_M.updateCategoryById(id, newCategory);
    let oldParentId = oldCategory.c_parent.id;
    let newParentId = newCategory.c_parent.id;
    if (oldParentId != newParentId){
      await groupCategory_M.deleteCategoryInGroup(oldParentId, id);
      await groupCategory_M.addCategoryIntoGroup(newParentId, {
        id: id,
        c_name: newCategory.c_name
      })
    }
    return resolve({
      type : true,
      message : transSuccess.update_data_successful    
    })
  })
};

let getOneGroup = (id) => {
  return new Promise(async(resolve, reject) => {
    let result = await groupCategory_M.findGroupById(id);
    if (result){
      return resolve(result);
    }
  })
};

let getListCategoriesOfGroup = (groupId) => {
  return new Promise( async(resolve, reject) => {
    let listCategories = await category_M.findCategoriesOfGroup(groupId);
    if (listCategories.length > 0) {
      return resolve(listCategories);
    }
    return resolve([]);
  })
};

let activeGroup = (id) => {
  return new Promise(async(resolve, reject) => {
    let result = await groupCategory_M.updateActive(id);
    if (result){
      return resolve({
        type : true,
        message : transSuccess.update_data_successful        
      });
    }
    return resolve({
        type : false,
        message : null        
    });
  });
};

let activeCategory = (id) => {
  return new Promise(async(resolve, reject) => {
    let result = await category_M.updateActive(id);
    if (result){
      return resolve({
        type : true,
        message : transSuccess.update_data_successful        
      });
    }
    return resolve({
        type : false,
        message : null        
    });
  });
};

const getMaxLevel = (level) => {
  return new Promise(async(resolve, reject) => {
    let result = await category_M.findMaxLevel();
    if (result){
      return resolve(result[0].c_level); 
    }
    return resolve(0);
  })
}



module.exports = {
  getOneGroup: getOneGroup,
  createNewGroup : createNewGroup,
  getListGroups : getListGroups,
  createNewcategory : createNewcategory,
  getListCategories: getListCategories,
  activeCategory : activeCategory,
  deleteCategory: deleteCategory,
  activeGroup: activeGroup,
  deleteGroup: deleteGroup,
  getOneCategory: getOneCategory,
  updateCategory: updateCategory,
  updateGroupCategory : updateGroupCategory,
  getListCategoriesOfGroup: getListCategoriesOfGroup,
  getMaxLevel: getMaxLevel
}