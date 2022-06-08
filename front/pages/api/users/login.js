import axios from 'axios';

export default async function handler(req, res){
    try{
        const logedUser = await axios.post('http://'+process.env.API_URL_BACK+':9191/api/login' , req.body.parameter.body , {
            headers : req.body.parameter.headers
        })
        return res.status(200).json(logedUser.data)
     } catch (error) {
        return res.status(error.status || 500).end(error.message)
    }
}