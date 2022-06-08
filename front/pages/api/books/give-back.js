import axios from 'axios';

export default async function handler(req, res){
    try{
        let param = req.body.parameter;
        console.log("param" ,param);
        const book = await axios.put('http://'+process.env.API_URL_BACK+':9191/books/return/id/'+param.path_variable,param.body ,{
            headers : param.headers
        })
        return res.status(200).json(book.data)
     } catch (error) {
        return res.status(error.status || 500).end(error.message)
    }
}