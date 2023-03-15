import {useSearchParams} from 'react-router-dom';
import api from '../../api';
import {useContext, useEffect, useRef, useState} from 'react';
import {KakaoUserContext} from '../../context/kakaoUserContext';

const { Kakao } = window;

const Redirect = () => {

    const javascriptKey = '7bf79d5bef7ec49ea947a11fa9a5b975'

    const [searchParams] = useSearchParams();
    const redirectUrl = 'http://192.168.111.145:3000/redirect';
    const {kakaoUserData, setKakaoUserData} = useContext(KakaoUserContext);


    const [profile, setProfile] = useState({});

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const token = userInfo.access_token
        if(searchParams.get('selected')){
            const users = searchParams.get('selected').users
            let uuids = []
            for(let i=0; i < users.length; i++){
                uuids.push(users[i].uuid)
            }
            alert(uuids)
            api.getToken(uuids, token).then((res) => {
                alert(res)
            }).catch((err) => {
                alert(err)
            })
        }
    }, [])


    useEffect(() => {
        if (!Kakao.isInitialized()) {
            Kakao.init(javascriptKey);
        }
        // 인자코드 받아서 저장하고 있는 인자코드가 없거나 다를경우만
        if(searchParams.get('code')){
            if(localStorage.getItem('code') === null || (localStorage.getItem('code') !== searchParams.get('code'))){
                localStorage.setItem('code', searchParams.get('code'))
                getToken()
            }
        }
    }, [searchParams])

    const getToken = () => {
        api.getToken(redirectUrl, searchParams.get('code')).then((r) => {
            localStorage.setItem('userInfo', JSON.stringify(r.data))
            setKakaoUserData(r.data)
            Kakao.Auth.setAccessToken(r.data.access_token);
            getProfile(r.data.access_token)
            console.log(kakaoUserData)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getProfile = (token) => {
        api.getProfile(token).then((res) => {
            console.log(res)
            setProfile(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    const onClickFriends = {
        script: () => {
            Kakao.Picker.selectFriends({
                returnUrl: redirectUrl, // 필수
                title: '친구 선택',
                maxPickableCount: 10,
                minPickableCount: 1,
            });
            // 팝업 방식
            // Kakao.Picker.selectFriends({
            //     title: '친구 선택',
            //     maxPickableCount: 10,
            //     minPickableCount: 1,
            // }).then((res) => {
            //     console.log(res)
            // }).catch((err) => {
            //     console.log(err)
            // })
        },
        api: () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            const token = userInfo.access_token
            api.getFriends(token).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
            console.log(token)
        }
    }


    return (
        <>
            Redirect
            <button onClick={() => {onClickFriends.script()}}>
                친구선택 스크립트
            </button>
            <button onClick={() => {onClickFriends.api()}}>
                친구선택 API
            </button>
            <p>

                {JSON.stringify(profile)}
            </p>
            <p>
                {
                    searchParams.get('selected') && searchParams.get('selected').users ? (
                        searchParams.get('selected').users.map((user) => (
                            <>
                                {
                                    user.uuid
                                }
                            </>
                        ))
                    ): <></>
                }
            </p>

        </>
    )
}

export default Redirect