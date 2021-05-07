const initialState = {
    products: []
}

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
            case "FIND_ALL_PRODUCTS":
                
            return {
                ...state,
                products: action.products
            }
        default:
            
            return initialState
    }
}

export default ProductReducer