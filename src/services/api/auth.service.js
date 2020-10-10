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
    setAuthCookieData = (apiResponse) => {
        const user   = apiResponse.data.user;
        const token  = apiResponse.data.token;
        localStorage.setItem(this.COOKIE_ID, JSON.stringify({user,token}));
    }
    removeAuthCookie = () => {
        const API_URL    = `${this.API_URL}/api/user/logout`;
        const cookieData = JSON.parse(localStorage.getItem(this.COOKIE_ID));
        const data       = JSON.stringify({
            "token":`${cookieData.token.refreshToken}`,
            "user":`${cookieData.user.id}`
        });
        const config  = {
            method:'post',
            url:API_URL,
            headers:{
                'Content-Type': 'application/json'
            },
            data:data
        };
        localStorage.removeItem(this.COOKIE_ID);
        return axios(config);  
    }
    /**
     * return App Cookie or null
     */
    getCookieData = () => {
        const cookieData = JSON.parse(localStorage.getItem(this.COOKIE_ID));
        if( typeof cookieData === 'undefined' ||
            cookieData === null ||
            !cookieData.token || 
            !cookieData.token.accessToken   ||
            !cookieData.token.refreshToken  || 
            !cookieData.user || 
            !cookieData.user.email ||
            !cookieData.user.id
        ){
            return null;
        }
        return cookieData;
    }
    authCheck = (refreshToken) => {
        const API_URL    = `${this.API_URL}/api/user/token-validation`;
        const data       = JSON.stringify({"token":`${refreshToken}`});
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
}

export default new AuthService();