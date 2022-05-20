import axios from 'axios'
import $store from '@/store/index'

const baseURL="http://localhost:3000";

let ajaxTimer = 0;
export function request(config){
    $store.commit('showLoading');
    //创建axios实例
    const instance = axios.create({
        baseURL,
        timeout:2000,
    });
    instance.interceptors.request.use(data =>{
        ajaxTimer ++;
        return data;
    },err => {
        $store.commit('hiddenLoading');
        return err;
    })
    instance.interceptors.response.use(data => {
        ajaxTimer--;
        if(ajaxTimer == 0) $store.commit('hiddenLoading');
        return data;
    }, err =>{
        $store.commit('hiddenLoading');
        //如果不return err ,loading一直在转是什么原因？
        throw err;
        return err;
    });
    return instance(config);
}