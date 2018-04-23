import { observable, action } from 'mobx';
import { get, post, put, patch, destroy } from '@/utils/api-requester';

class DetailStore {
    @observable detailInfo = [];

    @action setDetailInfo = (value) => {
        this.detailInfo = value;
    }

    async getDetail(data){
        let rs,
            url = 'orders/normal/view'
        try{
            rs = await get(url, data);
            rs && rs.data && rs.data.status==1 && this.setDetailInfo([rs.data.data]);
        } catch(err) {
            console.warn(err)
        }
        return rs;
    }
}

const detailStore = new DetailStore();

export default detailStore;
export { detailStore };

