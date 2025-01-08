import { jwtStorage } from "./jwt_storage";

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getDataPublic = (url) => {
  return fetch(url)
    .then((response) =>
      response.status >= 200 &&
      response.status <= 299 &&
      response.status !== 204
        ? response.json()
        : response
    )
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};
export const getData = async (url) => {
  return fetch(REACT_APP_API_URL + url)
    .then((response) =>
      response.status >= 200 &&
      response.status <= 299 &&
      response.status !== 204
        ? response.json()
        : response
    )
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const getDataPrivate = async (url) => {
  let token = await jwtStorage.retrieveToken();
  return fetch(REACT_APP_API_URL + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) =>
      response.status >= 200 &&
      response.status <= 299 &&
      response.status !== 204
        ? response.json()
        : response
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const sendData = async (url, data) => {
  return fetch(REACT_APP_API_URL + url, {
    method: "POST",
    body: data,
  })
    .then((response) =>
      response.status >= 200 &&
      response.status <= 299 &&
      response.status !== 204
        ? response.json()
        : response
    )
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const sendDataPrivate = async (url, formData) => {
  try {
    // Retrieve JWT token
    const token = await jwtStorage.retrieveToken();

    // Debug: log the JWT token and FormData
    console.log("JWT Token:", token);
    console.log("FormData:", Array.from(formData.entries()));

    // Make the POST request
    const response = await fetch(REACT_APP_API_URL + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the JWT token in the Authorization header
        // Note: No need to set Content-Type as FormData handles it
      },
      body: formData, // Send FormData directly
    });

    // Handle response
    if (response.status === 401) {
      return { isExpiredJWT: true }; // JWT token expired
    }

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      return contentType?.includes("application/json")
        ? await response.json()
        : await response.text();
    }

    // Handle non-2xx responses
    return {
      success: false,
      message: `Unexpected status: ${response.status}`,
      error: await response.text(), // Retrieve error message if available
    };
  } catch (err) {
    console.error("Error in sendDataPrivate:", err);
    return { success: false, error: err.message || "Unknown error occurred" };
  }
};

export const deleteData = async (url, data) => {
  return fetch(REACT_APP_API_URL + url, {
    method: "DELETE",
    body: data,
  })
    .then((response) => response)
    .catch((err) => console.log(err));
};

// export const editDataPrivatePut = async (url, data) => {
//   //401 -> jwt expired, flow process to login
//   //400 -> jwt malformed
//   //204 -> No Content, but success
//   //NOTE : You must special handle for HTTP status above
//   let token = await jwtStorage.retrieveToken();
//   return fetch(REACT_APP_API_URL + url, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) =>
//       response.status === 401
//         ? { isExpiredJWT: true }
//         : response.status >= 200 &&
//             response.status <= 299 &&
//             response.status !== 204
//           ? response.json()
//           : response,
//     )
//     .then((data) => data)
//     .catch((err) => console.log(err));
// };

export const editDataPrivatePut = async (url, formData) => {
  let token = await jwtStorage.retrieveToken();
  return fetch(REACT_APP_API_URL + url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json", // Remove this header
    },
    body: formData, // Send FormData directly
  })
    .then((response) =>
      response.status === 401
        ? { isExpiredJWT: true }
        : response.status >= 200 &&
          response.status <= 299 &&
          response.status !== 204
        ? response.json()
        : response
    )
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const editDataPrivateURLEncoded = async (url, data) => {
  //401 -> jwt expired, flow process to login
  //400 -> jwt malformed
  //204 -> No Content, but success
  //NOTE : You must special handle for HTTP status above
  // var token = localStorage.getItem("token_auth");
  let token = await jwtStorage.retrieveToken();
  return fetch(REACT_APP_API_URL + url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: data,
  })
    .then((response) =>
      response.status === 401
        ? { isExpiredJWT: true }
        : response.status >= 200 &&
          response.status <= 299 &&
          response.status !== 204
        ? response.json()
        : response
    )
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const deleteDataPrivateURLEncoded = async (url, data) => {
  //401 -> jwt expired, flow process to login
  //400 -> jwt malformed
  //204 -> No Content, but success
  //NOTE : You must special handle for HTTP status above
  // var token = localStorage.getItem("token_auth");
  let token = await jwtStorage.retrieveToken();
  return fetch(REACT_APP_API_URL + url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: data,
  })
    .then((response) =>
      response.status === 401
        ? { isExpiredJWT: true }
        : response.status >= 200 &&
          response.status <= 299 &&
          response.status !== 204
        ? response.json()
        : response
    )
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const deleteDataPrivateJSON = async (url, data) => {
  //401 -> jwt expired, flow process to login
  //400 -> jwt malformed
  //204 -> No Content, but success
  //NOTE : You must special handle for HTTP status above
  // var token = localStorage.getItem("token_auth");
  let token = await jwtStorage.retrieveToken();
  return fetch(REACT_APP_API_URL + url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) =>
      response.status === 401
        ? { isExpiredJWT: true }
        : response.status >= 200 &&
          response.status <= 299 &&
          response.status !== 204
        ? response.json()
        : response
    )
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const signoutAPI = async () => {
  let token = await jwtStorage.retrieveToken();
  let formData = new FormData();
  formData.append("logout", "Logout"); // Assuming jwtStorage retrieves token
  return fetch(REACT_APP_API_URL + "/api/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.status === 200) {
        jwtStorage.removeItem();
        return { isLoggedOut: true };
      } else {
        // Handle errors (e.g., unexpected status code)
        console.error("Logout failed:", response.statusText);
        return false;
      }
    })
    .catch((error) => {
      console.error("Logout error:", error);
      return false;
    });
};

export const getImage = (url_image) => {
  const imgDefault = "/storage/images/userpng_1717846018.png";
  let imgResult = url_image ? url_image : imgDefault;
  return REACT_APP_API_URL + imgResult;
};
