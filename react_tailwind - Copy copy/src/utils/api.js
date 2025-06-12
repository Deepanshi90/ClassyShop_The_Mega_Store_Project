import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// const token = localStorage.getItem("token");

export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, //include your api key in authorization
        'Content-Type': 'application/json', //Adjust the content type as needed
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.log("error from postData in frontened from api.js", error);
    return error;
  }
};


// export const postData = async (url, formData, options = {}) => {
//     try {
//       const headers = {
//         'Content-Type': 'application/json',
//       };

//       // Only add Authorization if token exists and caller wants it
//       if (options.withAuth) {
//         const token = localStorage.getItem("accessToken"); // Correct key
//         if (token) {
//           headers['Authorization'] = `Bearer ${token}`;
//         }
//       }

//       const response = await fetch(apiUrl + url, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         const errorData = await response.json();
//         return errorData;
//       }
//     } catch (error) {
//       console.log("error", error);
//       return error;
//     }
//   };


// export const fetchDataFromApi = async (url) => {
//     try {
//         // Sending GET request to API
//         const response = await axios.get(apiUrl + url, {
//             headers: {
//                'Authorization': `Bearer ${localStorage.getItem("token")}`, // Include your token in authorization
//                 'Content-Type': 'application/json', // Adjust the content type as needed
//             },
//         });

//         // Returning the data
//         return data;

//     } catch (error) {
//         console.log("Error fetching data:", error);
//         // Return or throw error depending on your need
//         throw error; // You can throw or return the error object
//     }
// };



// export const fetchDataFromApi = async (url) => {
//     try {
//       const { data } = await axios.get(apiUrl + url, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem("token")}`,
//           'Content-Type': 'application/json',
//         }
//       });
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       if (error.response) {
//         // The server responded with a status other than 2xx
//         console.log("Server responded with status:", error.response.status);
//         console.log("Response data:", error.response.data);
//       } else {
//         // The request was made but no response was received
//         console.log("No response received:", error.message);
//       }
//       return null;
//     }
//   };


// export const fetchDataFromApi = async (url) => {
//   try {
//     const params = {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, //include your api key in authorization
//         'Content-Type': 'application/json', //Adjust the content type as needed
//       },
//     }
//     const { data } = await axios.get(apiUrl, url, params)
//     return data;
//   } catch (error) {
//     console.log("erroe from fetchDataFrom Api ",error);
//     return error;

//   }
// }

export const fetchDataFromApi = async(url) =>{
  try {
    const params={
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      }
    }
    const {data} = await axios.get(apiUrl + url ,params)
    return data;
  } catch (error) {
    console.log("error from fetchDataFromApi",error);
    return error;
    
  }
}

export const uploadImage = async (url, updatedData) => {
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, //include your api key in authorization
      'Content-Type': 'multipart/form-data', //Adjust the content type as needed
    },
  }

  var response;
  await axios.put(apiUrl + url, updatedData, params).then((res) => {
    //  console.log(res);
    response = res;
  })


  return response;
}

export const editData = async (url, updatedData) => {
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, //include your api key in authorization
      'Content-Type': 'application/json', //Adjust the content type as needed
    },
  }

  var response;
  await axios.put(apiUrl + url, updatedData, params).then((res) => {
    //  console.log(res);
    response = res;
  })


  return response;
}

export const deleteData = async(url) =>{
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, //include your api key in authorization
      'Content-Type': 'application/json', //Adjust the content type as needed
    },
  }

  const {res} = await axios.delete(apiUrl+url,params)
  return res;
}