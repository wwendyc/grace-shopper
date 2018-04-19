import axios from 'axios'

const initialState = {
  products: [],
  selectedProduct: {}
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const SELECT_PRODUCT = 'SELECTED_PRODUCT'
const ADDED_REVIEW = 'ADDED_REVIEW'

const getProductsAction = products => ({
  type: GET_PRODUCTS,
  products
})

const selectProductAction = product => ({
  type: SELECT_PRODUCT,
  product
})

export const getProducts = async (dispatch) => {
  const res = await axios.get('/api/products')
  const products = res.data
  dispatch(getProductsAction(products))
}

export const selectProduct = (dispatch, product) => {
  dispatch(selectProductAction(product))
}
const addedReview = (review) => {
  return ({
    type: ADDED_REVIEW,
    review
  })
}

export const addReview = (review) => {
  return async (dispatch) => {
    const response = await axios.post('api/reviews/', review )
    console.log(response.data)
    dispatch(addedReview(response.data))
  }
}
export default (state = initialState, action) => {
  switch (action.type) {
  case GET_PRODUCTS:
    return {...state, products: action.products}
  case SELECT_PRODUCT:
    return {...state, selectedProduct: action.product}
  case ADDED_REVIEW:
    return {...state, selectedProduct: {...state.selectedProduct, reviews: [...state.selectedProduct.reviews, action.review]}}
  default:
    return state
  }
}
