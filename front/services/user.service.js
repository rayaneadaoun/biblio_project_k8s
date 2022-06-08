import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import axios from 'axios';
import { bookService } from './book.service';


const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));
const userTokensSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('userTokens')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    userToken: userTokensSubject.asObservable(),
    get userToken () { return userTokensSubject.value }, 
    login,
    logout,
    getAllUsers,
    register
};

async function login(username, password) {
    const parameter = {
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:`username=${username}&password=${password}`
    };

    return  axios.post(`${baseUrl}/login`,{parameter: parameter})
        .then(async (userTokens) => {

            const accessToken = userTokens.data.access_token

            const users = await getAllUsers(accessToken);

            const user = users.data.find(u => u.username === username);

            if (!user) throw 'Username or password is incorrect';

            const books =  await bookService.listForUser(user.userId);

            user.activeBooks = books?.data?.map(book => {
                return{ 
                params: {
                    id : book.bookId,
                    name : book.name,
                    category : book.category
                  }
                }
            });

        
            const inactiveBooks =  await bookService.historyForUser(user.userId);
            

            user.inactiveBooks = inactiveBooks?.data?.map(book => {
                return{ 
                params: {
                    id : book.bookId,
                    name : book.name,
                    category : book.category
                  }
                }
            });

 
       
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userTokens', JSON.stringify(userTokens.data));
            return user
        })
        .catch(err => console.log('err' , err));
}


async function register(username, password , name , email, age) {
    const parameter = {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: {
            "name": name,
            "username": username,
            "email": email,
            "age": age,
            "password": password
        }
      
    };

    return axios.post(`${baseUrl}/register`, {parameter: parameter})
        .then(user => {

            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user.data);
            localStorage.setItem('user', JSON.stringify(user.data));
            return user.data;
        })
        .catch(err => console.log('err' , err));
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

async function getAllUsers(accesToken) {
    const parameter = {
        headers: { 
            'Authorization': "Bearer "+accesToken,
        },
    };
    return axios.post(`${baseUrl}/list`,{parameter: parameter});
}




