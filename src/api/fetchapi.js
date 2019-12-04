import * as Constant from './constant'

export async function request(method, url, param){
    try {
        const res = await fetch(Constant.BASE_URL + url + Constant.API_KEY + param, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const result = await res.json()
        console.log("SUCCESS : ", result);
        if(result){
            return result
        }
    }
    catch (error) {
        console.error(error);
        return error
    }
}