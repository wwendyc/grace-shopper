import axios from 'axios'

const initialState = {
  products: [],
  selectedProduct: {}
  // selectedProduct: {
  //   id: 1,
  //   name: "Sully's thunder roar",
  //   description: 'BootCamp it is!!!',
  //   price: 100,
  //   imgUrl: '',
  //   reviews: [{
  //     review: 'excellent',
  //     rating: 4
  //   },
  //   {
  //     review: 'OutStanding',
  //     rating: 5
  //   }],
  //   categories: [{
  //     name: 'Remote'
  //   }]
  // }
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const SELECT_PRODUCT = 'SELECTED_PRODUCT'
const ADDED_REVIEW = 'ADDED_REVIEW'

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

const addedReview = (review) => {
  return ({
    type: ADDED_REVIEW,
    review
  })
}

export const addReview = (review) => {
  console.log("at review")
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
