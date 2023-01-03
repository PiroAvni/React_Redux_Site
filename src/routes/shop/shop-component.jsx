import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { useDispatch
 } from "react-redux";
import CategoryPreview from "../categories-preview/categories-preview.component";

import Category from "../category/category.component";

//import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesAsync } from "../../store/categories/categories.action";

import "./shop-component.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
 }, []);

  /* useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      console.log(categoriesArray)
      //console.log(categoryMap);
     dispatch(setCategories(categoriesArray));
    };

    getCategoriesMap();
  }, []);
 */
  return (

      <Routes>
        <Route index element={<CategoryPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>
    
  );
};

export default Shop;