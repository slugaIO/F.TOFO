require('dotenv').config();

class Logger{
    static table =  (object) => {
        if(process.env.REACT_APP_DEBUG_MODE){
            console.table(object);
        }else{
            console.log('Production Mode');
        }
    };
}

export default Logger;