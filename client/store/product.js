import axios from 'axios'

const initialState = {
  products: [],
  selectedProduct: {}
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const SELECT_PRODUCT = 'SELECTED_PRODUCT'

const getProductsAction = products => ({
  type: GET_PRODUCTS,
  products
})

const setProductAction = product => ({
  type: SELECT_PRODUCT,
  product
})

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/products')
    const products = res.data
    dispatch(getProductsAction(products))   
  } catch (error) { console.log(error) } // redirect to error page instead of just console logging.
}

export const setProduct = (product) => (dispatch) => { 
  dispatch(setProductAction(product))
}

export default (state = initialState, action) => {
  switch(action.type) {
  case GET_PRODUCTS:
    return {...state, products: action.products}
  case SELECT_PRODUCT: 
    return {...state, selectedProduct: action.product}
  default:
    return state
  }
}