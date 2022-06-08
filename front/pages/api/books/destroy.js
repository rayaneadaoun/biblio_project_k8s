import axios from 'axios';

export default async function handler(req, res){

    try{
        const book = await axios.delete('http://'+process.env.API_URL_BACK+':9191/books/delete/'+req.body.path_variable)
        return res.status(200).json(book.data)
     } catch (error) {
        return res.status(error.status || 500).end(error.message)
    }
}