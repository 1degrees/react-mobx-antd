import { observable, action } from 'mobx';
import { get, post, put, patch, destroy } from '@/utils/api-requester';

class LoginStore {
    @observable username = "";
    @observable password = "";

    @action changeUsername = (value) => {
        this.username = value;
    }
    @action changePassword = (value) => {
        this.password = value;
    }

    async login(data){
        let rs,
            url = 'member/account/login',
            opt = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        try{
            rs = await post(url, data, opt);
        } catch(err) {
            console.warn(err)
        }
        return rs;
    }
}

const loginStore = new LoginStore();

export default loginStore;
export { LoginStore };

