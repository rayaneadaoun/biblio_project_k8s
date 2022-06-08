import axios from 'axios';

export default async function handler(req, res){
    const newReq = req.body.parameter
    const request = await fetch(`http://`+process.env.API_URL_BACK+`:9191/books/userId/${newReq.path_variable}/history`);
    const books = await request.json();
    return res.status(200).json(books)
}
