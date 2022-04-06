import axios from "axios"
import { bindActionCreators } from "redux"

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_ CATEGORIES"
}

export const setProducts = products =>({
    type: actions.setProducts,
    payload: products
})

export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload:isLoading
})

export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})

export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/')
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(()=> dispatch(setIsLoading(false)))
    }
}

export const getCategoriesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/')
            .then(res => dispatch(setCategories(res.data.data.categories)))
            .finally(()=> dispatch(setIsLoading(false)))
    }
}

export const filterCategoryThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(()=> dispatch(setIsLoading(false)));
    }
}

export const filterHeadlineThunk = headline => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get (`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${headline}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}