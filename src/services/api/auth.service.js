import axios from 'axios';

class AuthService{
    API_URL   =  `//${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;
    COOKIE_ID = 'sluga.io-TODO';
    userLogin = async (email,password) => {
        const API_URL = `${this.API_URL}/api/user/login`;
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
                    const cookieData = {
                        success:true,
                        token:{
                            accessToken:accessToken,
                            refreshToken:refreshToken
                        }
                    }
                    this.setAuthCookieData(cookieData);
                    resolve(cookieData);
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
    setAuthCookieData = (cookieData) => {
        localStorage.setItem(COOKIE_ID, JSON.stringify(cookieData));
    }
}

export default new AuthService();