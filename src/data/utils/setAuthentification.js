import axios from "axios";
// const setAuthToken = (token) => {
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = token;
//   } else {
//     delete axios.defaults.headers.common["Authorization"];
//   }
// };

const setAuthTokenEverest = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
}
export default setAuthTokenEverest;
