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

const selectProductAction = product => ({
  type: SELECT_PRODUCT,
  product
})

export const getProducts = async () => {
  const products = await axios.get('/api/products')
  dispatch(getProductsAction(products))
}

export const selectProduct = product => {
  dispatch(selectProductAction(product))
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