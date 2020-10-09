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
        return axios(config);
    }
    setAuthCookieData = (cookieData) => {
        localStorage.setItem(this.COOKIE_ID, JSON.stringify(cookieData));
    }
    authCheck = () => {
        const API_URL    = `${this.API_URL}/api/user/token-validation`;
        const cookieData = JSON.parse(localStorage.getItem(this.COOKIE_ID));
        console.table(cookieData.token);
        const data       = JSON.stringify({"refreshToken":`${cookieData.token.refreshToken}`});
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
                return new Promise( (resolve, reject) => {
                    resolve({
                        success:true   
                    });
                });
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