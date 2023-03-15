import axios from 'axios';
import qs from 'qs';

const kAuth = axios.create({
    baseURL: 'https://kauth.kakao.com'
})

const kApi = axios.create({
    baseURL: 'https://kapi.kakao.com'
})

const REST_API_KEY = 'f0016ef6a83fe27a6188d2f5106d90c4'

const api = {

    // kakao 인가코드 받아오기 (순서1)
    getToken: (redirectUri, code) => {
        const param = {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: redirectUri,
            code: code
        }
        return new Promise((resolve, reject) => {
            kAuth.post(`/oauth/token`, qs.stringify(param), {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getProfile: (acessToken) => {
        return new Promise((resolve, reject) => {
            kApi.get(`/v1/api/talk/profile`, {
                headers: {
                    'Authorization': `Bearer ${acessToken}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getFriends: (acessToken) => {
        return new Promise((resolve, reject) => {
            kApi.get(`/v1/api/talk/friends`, {
                headers: {
                    'Authorization': `Bearer ${acessToken}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

}

export default api