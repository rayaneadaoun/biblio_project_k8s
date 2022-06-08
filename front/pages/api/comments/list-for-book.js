import axios from 'axios';

export default async function handler(req, res){
    try{
     
        const newReq = req.body.parameter;

        const request = await fetch(`http://'+process.env.API_URL_BACK+':9191/comments/bookId/${newReq.path_variable}`);
        const comments = await res.data.json();


        return res.status(200).json(comments)

        return comments
     } catch (error) {
         return;
        return res.status(error.status || 500).end(error.message)
    }
}