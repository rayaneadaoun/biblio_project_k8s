import axios from 'axios';

export default async function handler(req, res){
    try{
        const savedUser = await axios.post('http://'+process.env.API_URL_BACK+':9191/api/user/save' , req.body.parameter.body , {
            headers : req.body.parameter.headers
        })
        return  res.status(200).json(savedUser.data)
     } catch (error) {
        return res.status(error.status || 500).end(error.message)
    }
}