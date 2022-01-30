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
  return (dispatch) => {
    fetch("https://nftstripe.herokuapp.com/api/getStripeCount")
    .then(response => response.json())
    .then(data => {
      let [respData] = data
      dispatch(fetchDataTimer({time:respData.count}))
      CountUpdateApi(parseInt(respData.count) + 1)
    });
  }
}


export const CountUpdateApi = (count) => {
  fetch(`https://nftstripe.herokuapp.com/api/updateCount?id=61f6a51a7563d155b38ba1c1&count=${count}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });
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
