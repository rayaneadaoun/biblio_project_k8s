import axios from 'axios';

export default async function handler(req, res){

    try{
        const comment = await axios.delete('http://'+process.env.API_URL_BACK+':9191/comments/delete/'+req.body.path_variable)
        return res.status(200).json(comment.data)
     } catch (error) {
        return res.status(error.status || 500).end(error.message)
    }
}