import category_M from "../models/category.model";
import slug from "url-slug"
import { transSuccess, transErrors } from "../../lang/vi"
import _ from "lodash"




let createNewCategory = (object) => {
  return new Promise(async (resolve, reject) => {
    let urlSlug = slug(object.c_name, {
      separator: '-',
      transformer: false
    }).toLowerCase();
    let item = {
      c_name: object.c_name,
      c_slug: urlSlug,
      c_level: object.c_level,
      c_parentId: object.c_parentId
    }
    if (!await category_M.findBySlug(urlSlug)) {
      let category = await category_M.createNew(item);
      if (category) {
        return resolve({
          type: true,
          message: transSuccess.add_data_successful
        });
      }
    }
    return resolve({
      type: false,
      message: transErrors.add_data_failed
    });
  })
};


let getListCategories = () => {
  return new Promise(async (resolve, reject) => {
    let result = await category_M.findAll();
    if (result) {
      return resolve(result);
    }
  })
};

let getListCategoriesByLevel = (level) => {
  return new Promise(async (resolve, reject) => {
    let result = await category_M.findAllByLevel(level);
    if (result) {
      return resolve(result);
    }
  })
}

let getListDataCategories = () => {
  return new Promise(async (resolve, reject) => {
    let result = await category_M.findAll();
    if (result) {
      let listData = result.map(async (category) => {
        let checkConstraint = false;
        let c_parent = null;
        if (category.c_parent != '0') {
          c_parent = await category_M.findCategoryById(category.c_parentId);
        }
        let c_child = await category_M.findChildCategoryById(category._id);
        if (c_child.length == 0) {
          checkConstraint = true;
        }
        return new Object({
          category: category,
          c_parent: c_parent,
          checkConstraint: checkConstraint
        });
      });
      return resolve(await Promise.all(listData));
    }
  })
}

let deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    let resultFromCategory = await category_M.deleteCategory(id);
    if (resultFromCategory.deletedCount != 0) {
      return resolve({
        type: true,
        message: transSuccess.remove_data_successful
      });
    }
    return resolve({
      type: false,
      message: transErrors.remove_data_failed
    })
  })
};


let getOneCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    let category = await category_M.findCategoryById(id);
    if (category) {
      resolve(category);
    }
  })
};



let updateCategory = (object) => {
  return new Promise(async (resolve, reject) => {
    let id = object._id;
    let urlSlug = slug(object.c_name, {
      separator: '_',
      transformer: false
    }).toLowerCase();
    let newCategory = {
      c_name: object.c_name,
      c_slug: urlSlug,
      c_level: object.c_level,
      c_parentId: object.c_parentId,
      c_updatedAt: Date.now()
    }
    let category = category_M.findCategoryById(id);
    let checkExists = category_M.findBySlug(urlSlug);
    if (!checkExists || category.c_slug == checkExists.c_slug) {
      await category_M.updateCategoryById(id, newCategory);
      return resolve({
        type: true,
        message: transSuccess.update_data_successful
      })
    }
    return resolve({
      type: false,
      message: null
    })
  })
};


let activeCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    let result = await category_M.updateActive(id);
    if (result) {
      return resolve({
        type: true,
        message: transSuccess.update_data_successful
      });
    }
    return resolve({
      type: false,
      message: null
    });
  });
};

let getMaxLevel = () => {
  return new Promise(async (resolve, reject) => {
    let result = await category_M.findMaxLevel();
    if (result) {
      return resolve(result[0].c_level);
    }
    return resolve(0);
  })
};

let getCategoriesByC_level = (c_level) => {
  return new Promise(async (resolve, reject) => {
    let result = await category_M.findAllByLevel(c_level);
    if (result) {
      return resolve(result);
    }
    return false
  })
};

let getCategoryChildById = (id) => {
  return new Promise(async (resolve, reject) => {
    let result = await category_M.findChildCategoryById(id);
    if (result.length > 0) {
      return resolve(result);
    }
    return [];
  })
};

const getMenuCategory = () => {
  return new Promise( async (resolve, reject) => {
    let c_parent = await category_M.findAllByLevel(1);
    let menu = await Promise.all(c_parent.map(async parent => {
      let child = await category_M.findChildCategoryById(parent._id);
      let object = new Object(parent._doc);
      if (child.length > 0) {
        object = _.assign(object, {child: child});
        return object
      }
      else {
        object = _.assign(object, {child: []});
        return object
      }
    }));
    resolve(menu);
  })
};

const getCategoryCount = () => {
  return new Promise( async (resolve, reject) => {
    const categories = await category_M.findAll();
    const categoryCount = categories.length
    resolve(categoryCount);
  })
}


module.exports = {
  getMaxLevel, deleteCategory, getMenuCategory,
  getOneCategory, updateCategory, activeCategory,
  getListCategories, createNewCategory, getCategoryChildById,getCategoryCount,
  getListDataCategories, getCategoriesByC_level, getListCategoriesByLevel,
}