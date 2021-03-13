
const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutToken = (endpoint, data, method="GET") => {
    const url = `${baseUrl}/${endpoint}`; 

    if(method === "GET"){
        return fetch(url); 
    }else{
        return fetch(url, {
            method, 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(data)
        })
    }
}

const fetchImageWithoutToken = (endpoint, file, method="GET") => {
    const url = `${baseUrl}/${endpoint}`; 

    let formData = new FormData(); 
    formData.append("image", file); 

    if(method === "GET"){
        return fetch(url); 
    }else{
        return fetch(url, {
            method, 
            body: formData
        })
    }
}

const fetchWithToken = (endpoint, data, method="GET") => {
    const url = `${baseUrl}/${endpoint}`; 
    const token = localStorage.getItem("token") || "";

    if(method === "GET"){
        return fetch(url, {
            method,
            headers: {
                "x-token": token
            }
        }); 
    }else{
        return fetch(url, {
            method, 
            headers: {
                "Content-Type": "application/json", 
                "x-token": token
            }, 
            body: JSON.stringify(data)
        })
    }
}

export {
    fetchWithoutToken, 
    fetchWithToken, 
    fetchImageWithoutToken
}