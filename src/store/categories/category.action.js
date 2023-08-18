import { createAction } from "../../utils/reducers/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.action_type";

export const setCategoriesMap = (categoriesMap) => createAction(CATEGORIES_ACTION_TYPES, categoriesMap)