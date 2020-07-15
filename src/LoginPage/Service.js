import ApiInstance from "../api";

export default async function UserAuthApi(data) {
  try {
    const response = await ApiInstance.post("/token", data);
    if (response.status === 200) {
      ApiInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token.access}`; // set auth token
      let responseData = response.data;

      return Promise.resolve(responseData);
    }
    return Promise.reject("Something went wrong");
  } catch (error) {
    console.log(error);
    let message = "";
    if (
      (error && error.response && error.response.data) ||
      error.response.data.message
    ) {
      message = error.response.data;
    } else {
      message = "Invalid username and password";
    }
    return Promise.reject(message);
  }
}
