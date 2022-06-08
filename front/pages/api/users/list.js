import axios from 'axios';

export default async function handler(req, res){
    try{
        const users = await axios.get('http://'+process.env.API_URL_BACK+':9191/api/users', {
            headers : req.body.parameter.headers
        })
       
        return res.status(200).json(users.data)
     } catch (error) {
        return res.status(error.status || 500).end(error.message)
    }
}