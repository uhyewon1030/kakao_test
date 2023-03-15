import axios from 'axios';
import qs from 'qs';

const kAuth = axios.create({
    baseURL: 'https://kauth.kakao.com'
})

const kApi = axios.create({
    baseURL: 'https://kapi.kakao.com'
})

const REST_API_KEY = 'f0016ef6a83fe27a6188d2f5106d90c4'

const template  = {
    "object_type": "feed",
    "content": {
        "title": "오늘의 디저트",
        "description": "아메리카노, 빵, 케익",
        "image_url": "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
        "image_width": 640,
        "image_height": 640,
        "link": {
            "web_url": "http://www.daum.net",
            "mobile_web_url": "http://m.daum.net",
            "android_execution_params": "contentId=100",
            "ios_execution_params": "contentId=100"
        }
    },
    "item_content" : {
        "profile_text" :"Kakao",
        "profile_image_url" :"https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
        "title_image_url" : "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
        "title_image_text" :"Cheese cake",
        "title_image_category" : "Cake",
        "items" : [
            {
                "item" :"Cake1",
                "item_op" : "1000원"
            },
            {
                "item" :"Cake2",
                "item_op" : "2000원"
            },
            {
                "item" :"Cake3",
                "item_op" : "3000원"
            },
            {
                "item" :"Cake4",
                "item_op" : "4000원"
            },
            {
                "item" :"Cake5",
                "item_op" : "5000원"
            }
        ],
        "sum" :"Total",
        "sum_op" : "15000원"
    },
    "social": {
        "like_count": 100,
        "comment_count": 200,
        "shared_count": 300,
        "view_count": 400,
        "subscriber_count": 500
    },
    "buttons": [
        {
            "title": "웹으로 이동",
            "link": {
                "web_url": "http://www.daum.net",
                "mobile_web_url": "http://m.daum.net"
            }
        },
        {
            "title": "앱으로 이동",
            "link": {
                "android_execution_params": "contentId=100",
                "ios_execution_params": "contentId=100"
            }
        }
    ]
}

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
    },
    sendMessage: (uuids, acessToken) => {
        const param = {
            receiver_uuids: JSON.stringify(uuids),
            template_object: JSON.stringify(template)
        }
        return new Promise((resolve, reject) => {
            kApi.post(`/v1/api/talk/friends/message/default/send`, qs.stringify(param), {
                headers: {
                    'Authorization': `Bearer ${acessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    },

}

export default api