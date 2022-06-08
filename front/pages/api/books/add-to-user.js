import axios from 'axios';

export default async function handler(req, res){
    try{
        const newReq = req.body.parameter
        const users = await axios.put(`http://`+process.env.API_URL_BACK+`:9191/books/id/${newReq.path_variable}`, newReq.body ,{
            headers : newReq.headers
        })
        return res.status(200).json(users.data)
     } catch (error) {
        return res.status(error.status || 500).end(error.message)
    }
}
