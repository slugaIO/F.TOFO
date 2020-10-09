import axios from 'axios';

class AuthService{
    userLogin = async (email,password) => {
        const API_URL = `//${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/user/login`;
        const data    = JSON.stringify({"email":`${email}`,"password":`${password}`});
        const config  = {
            method:'post',
            url:API_URL,
            headers:{
                'Content-Type': 'application/json'
            },
            data:data
        };
        return axios(config)
        .then( (response) => {
            if(response.data.success){
                const accessToken  = response.data.tokens.accessToken || '';
                const refreshToken = response.data.tokens.refreshToken || '';
                return new Promise( (resolve, reject) => {
                    resolve({
                        success:true,
                        token:{
                            accessToken:accessToken,
                            refreshToken:refreshToken
                        }
                    })
                });
            }else{
                return new Promise( (resolve, reject) => {
                    reject({
                        success:false
                    })
                })
            }
        })
        .catch( (error) => {
            return new Promise((resolve, reject) => {
                reject({
                    success:false
                })
            })
        });
    }
}

export default new AuthService();