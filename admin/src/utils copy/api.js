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


export const uploadImages = async(url, formData) =>{
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, //include your api key in authorization
      'Content-Type': 'multipart/form-data', //Adjust the content type as needed
    },
  }

  var response;
  await axios.post(apiUrl + url, formData, params).then((res) => {
    //  console.log(res);
    response = res;
  })


  return response;
}


export const deleteImages = async (url, image) => {
  const res = await axios.delete(apiUrl + url, {
    data: image,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  return res;
};

export const deleteData = async(url) =>{
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, //include your api key in authorization
      'Content-Type': 'application/json', //Adjust the content type as needed
    },
  }
  const {res} = await axios.delete(apiUrl + url, params);
  return res
}



export const deleteMultipleData = async (url, body) => {
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    data: body.data, // ✅ pass the body here
  };

  const response = await axios.delete(apiUrl + url, params);
  return response;
};