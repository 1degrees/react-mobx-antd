import { get, post, put, patch, destroy } from '@/utils/api-requester';


export const logining = async (data) => {
        let rs,
            url = 'orders/normal/list',
            opt = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        try{
            rs = await post(url, data, opt);
        } catch(err) {
            console.warn(err)
        } 
        runInAction("说明一下这个action是干什么的。不写也可以", () => {
            this.data = data;
        })
    }