import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import axios from 'axios';
import Notiflix from 'notiflix';
import Router from 'next/router'


const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/books`;
const bookSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('book')));


export const bookService = {
    book: bookSubject.asObservable(),
    get bookValue () { return bookSubject.value },
    addToUser,
    store,
    update,
    destroy,
    listForUser,
    giveBack,
    historyForUser,
    searchByName
};

async function addToUser(bookId, userId) {
    const parameter = {
        path_variable : bookId,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: {userId}
    };

    return  axios.post(`${baseUrl}/add-to-user`,{parameter: parameter})
        .then(async (book) => {
            Router.push('/profile/me');
            return book
        })
        .catch(err => console.log('err' , err));
}


async function store(name , category) {
    Notiflix.Notify.success('Livre ajouté avec succés');
    const parameter = {
        headers: { 
            'Content-Type': 'application/json',
        },
        body:{
            "name" : name,
            "category" : category
         }
    };

    return  axios.post(`${baseUrl}/store`,{parameter: parameter})
        .then((book) => {
            return book
        })
        .catch(err => console.log('err' , err));
}


async function update(id , name , category) {
    const parameter = {
        headers: { 
            'Content-Type': 'application/json',
        },
        body:{
            "bookId" : id,
            "name" : name,
            "category" : category
         }
    };

    return  axios.post(`${baseUrl}/update`,{parameter: parameter})
        .then((book) => {
            return book
        })
        .catch(err => console.log('err' , err));
}

async function destroy(id) {
    Notiflix.Notify.success('Livre supprimé avec succés');
    return  axios.post(`${baseUrl}/destroy`,{path_variable: id})
        .then((book) => {
            Router.push('/books/list');
            return book
        })
        .catch(err => console.log('err' , err));
}


async function listForUser( userId){
    const parameter = {
        path_variable : userId,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return  axios.post(`${baseUrl}/list-for-user`,{parameter: parameter})
        .then(async (books) => {
            return books
        })
        .catch(err => console.log('err' , err));
}



async function historyForUser( userId){
    const parameter = {
        path_variable : userId,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return  axios.post(`${baseUrl}/history-for-user`,{parameter: parameter})
        .then(async (books) => {
            return books
        })
        .catch(err => console.log('err' , err));
}




async function giveBack(bookId , userId) {
    const parameter = {
        path_variable : bookId,
        headers: { 
            'Content-Type': 'application/json',
        },
        body:{
            "userId" : userId,
         }
    };

    return  axios.post(`${baseUrl}/give-back`,{parameter: parameter})
        .then((book) => {
            Router.push('/profile/me');
            return book
        })
        .catch(err => console.log('err' , err));
}


async function searchByName(name) {
    return  axios.post(`${baseUrl}/search-by-name`,{path_variable: name})
        .then((book) => {
            return book
        })
        .catch(err => console.log('err' , err));
}


