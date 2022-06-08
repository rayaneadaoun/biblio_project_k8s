import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import axios from 'axios';
import Router from 'next/router'


const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/comments`;
const commentSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('comment')));


export const commentService = {
    comment: commentSubject.asObservable(),
    get commentValue () { return commentSubject.value },
    store,
    update,
    destroy,
    listForBook
};



async function store(content , grade , userId , bookId) {
    const parameter = {
        headers: { 
            'Content-Type': 'application/json',
        },
        body:{
            "content" : content,
            "grade" : grade,
            "userId" : userId,
            "bookId" : bookId
         }
    };

    return  axios.post(`${baseUrl}/store`,{parameter: parameter})
        .then((comment) => {
            return comment
        })
        .catch(err => console.log('err' , err));
}


async function update(id , content , grade) {
    const parameter = {
        headers: { 
            'Content-Type': 'application/json',
        },
        body:{
            "commentId" : id,
            "content" : content,
            "grade" : grade
         }
    };

    return  axios.post(`${baseUrl}/update`,{parameter: parameter})
        .then((comment) => {
            return comment
        })
        .catch(err => console.log('err' , err));
}

async function destroy(id) {
    return  axios.post(`${baseUrl}/destroy`,{path_variable: id})
        .then((comment) => {
            Router.push('/books/list');
            return comment
        })
        .catch(err => console.log('err' , err));
}


async function listForBook(bookId) {
    const parameter = {
        path_variable : bookId,
        headers: { 
            'Accept': '*/*',
        },
    };

    return  axios.post(`${baseUrl}/list-for-book`,{parameter: parameter})
        .then(async (comments) => {
            return comments
        })
        .catch(err => console.log('err' , err));
}




