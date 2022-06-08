import axios from 'axios';

export default async function handler(req, res){
    try{
        const comment = await axios.post('http://'+process.env.API_URL_BACK+':9191/comments',req.body.parameter.body ,{
            headers : req.body.parameter.headers
        })
        return res.status(200).json(comment.data)
     } catch (error) {
        return res.status(error.status || 500).end(error.message)
    }
}