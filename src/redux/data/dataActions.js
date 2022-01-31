// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchDataTimer = (payload) => {
  return {
    type: "FETCH_DATA_TIMER",
    payload: payload,
  };
};


export const CountApiCall = () => {
  return async (dispatch) => {
    await fetch("https://stripeapicounter.herokuapp.com/updateCount")
    .then(response => response.json())
    .then(data => {
      dispatch(fetchDataTimer({time:data.count}))  
    })
    .catch(err => console.log(err))
  }
}

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
