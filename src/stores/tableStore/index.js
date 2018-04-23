import { observable, action } from 'mobx';
import { get, post, put, patch, destroy } from '@/utils/api-requester';

class LoginStore {
    @observable listData = [];
    @observable status = 0;

    @action setListData = (value) => {
        this.listData = value;
    }

   async getTableData() {
        let rs,
            url = 'orders/normal/list';
        try{
            rs = await get(url)
            this.setListData(rs.data.data.lists);
        } catch(err) {
            console.warn(err)
        } 
        return rs;
    }
}

const loginStore = new LoginStore();

export default loginStore;
export { LoginStore };

