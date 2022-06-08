const jwt = require('jsonwebtoken');
import getConfig from 'next/config';

import { apiHandler } from '../helpers/api';

const { serverRuntimeConfig } = getConfig();

export async  function getAllUsers() {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('http://'+process.env.API_URL_BACK+':9191/users');
    const users = await res.json();
    return users.map((user) => {
    return {
        params: {
        id: user.userId,
        name : user.name,
        username : user.username,
        email : user.email,
        age : user.age,
        numberOfBooks : user.numberOfBooks ,
        roles : user.roles     
        }
    };
    });
}
// users in JSON file for simplicity, store in a db for production applications


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function authenticate() {
        const { username, password } = req.body;
        const users = getAllUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) throw 'Username or password is incorrect';
    
        // create a jwt token that is valid for 7 days
        const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    
        // return basic user details and token
        return res.status(200).json({
            id: user.userId,
            name : user.name,
            username : user.username,
            email : user.email,
            age : user.age,
            numberOfBooks : user.numberOfBooks ,
            roles : user.roles,
            token
        });
    }
}
