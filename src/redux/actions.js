import axios from "axios"
/* import { bindActionCreators } from "redux"
 */
export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_ CATEGORIES",
    setCart: "SET_ CART",
    setPurchases: "SET_PURCHASES",
    setIsLoginOpen: "SET_IS_LOGIN_OPEN",
}

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

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

export const setCart = cart => ({
    type: actions.setCart,
    payload: cart
})

export const setPurchases = purchases => ({
    type: actions.setPurchases,
    payload: purchases
})

export const setIsLoginOpen = isLoginOpen => ({
    type: actions.setIsLoginOpen,
    payload: isLoginOpen
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

export const loginThunk = credentials => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post ('https://ecommerce-api-react.herokuapp.com/api/v1/users/login/', credentials)
            .finally(()=> dispatch(setIsLoading(false)));
    } 
} 

export const createUserThunk = information => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/', information)
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const addFavoriteThunk = products => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post ('https://ecommerce-api-react.herokuapp.com/api/v1/cart/', products, getConfig())
            .finally(()=> dispatch(setIsLoading(false)));
    }
}

export const getCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart/', getConfig())
            .then(res => dispatch(setCart(res.data.data.cart.products)))
            .catch(error => {
                if(error.response.status === 404){
                    console.log("El carrito esta vacio");
                    dispatch(setCart([]))
                }
            })
            .finally(()=> dispatch(setIsLoading(false)));
    }
}

export const deleteCartThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
            .then(() => dispatch(getCartThunk()))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const purchasesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases/', getConfig())
            .then(res => (
                dispatch(setPurchases(res.data.data.purchases))
                ))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const addPurchasesThunk = locations => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases/', locations, getConfig())
            .finally(() => dispatch(setIsLoading(false)));
    }
}




