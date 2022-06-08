import { userService } from "../services";

export async  function getAllUsers() {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const parameter = {
        method: 'GET',
        headers: { 
            "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnw6lnw6kiLCJyb2xlcyI6W10sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6OTAwMi9hcGkvbG9naW4iLCJleHAiOjE2NTQzNzYyNTl9.lkesIwaN_5g2myv4vFJxxextEFjdyjlsfMRBTuL7S5I"
        },
    };

    
    const res = await fetch('http://'+process.env.API_URL_BACK+':9191/api/users' , parameter );
    const users = await res.json();
    return users.map((user) => {
    return {
        params: {
        id: user.userId,
        name : user.name,
        username : user.username,
        email : user.email,
        age : user.age,
        numberOfBooks : user.numberOfBooks ,
        roles : user.roles     
        }
    };
    });
}
    
export async function getUserData(id) {
    const parameter = {
        method: 'GET',
        headers: { 
            "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnw6lnw6kiLCJyb2xlcyI6W10sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6OTAwMi9hcGkvbG9naW4iLCJleHAiOjE2NTQzNzYyNTl9.lkesIwaN_5g2myv4vFJxxextEFjdyjlsfMRBTuL7S5I"
        },
    };
    
    const res = await fetch('http://'+process.env.API_URL_BACK+':9191/api/id/'+id , parameter);
    const user = await res.json();
    return {
        params: {
        id: user.userId,
        name : user.name,
        username : user.username,
        email : user.email,
        age : user.age,
        numberOfBooks : user.numberOfBooks,
        roles : user.roles  
        }
    };

}



export function getCurrentUser(){

    return userService.userValue
}