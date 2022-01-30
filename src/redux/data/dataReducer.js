const initialState = {
  loading: false,
  totalSupply: 0,
  totalCountDone: 0,
  cost: 0,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        // cost: action.payload.cost,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
     case "FETCH_DATA_TIMER":
       return{
        ...state,
        totalCountDone: action.payload.time,
        error: false,
        errorMsg: "",
    }
    default:
      return state;
  }
};

export default dataReducer;
