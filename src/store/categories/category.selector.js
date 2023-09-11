//useSelector(( state ) => {})
//the function in the useSelector is what selectCategoriesMap represent

import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

//                                      receivers an inputSelector, the output selector function receives the state
//                                      which is our                that the inputSelector returns
//                                      selecCategoryReducer        I just decided to call it categoriesSlice so that it will make sense
const selectCategories = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.categories)

export const selectCategoriesMap = createSelector([selectCategories], (categories) => categories.reduce((accumulator, category) => {
                                                                                                            const { title, items } = category;
                                                                                                            accumulator[title.toLowerCase()] = items;
                                                                                                            return accumulator
                                                                                                        }, {})
  )

export const selectCategoriesIsLoading = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.isLoading)