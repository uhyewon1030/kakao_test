import api from '../../api';
import {useEffect} from 'react';

const Home = () => {


    const restApiKey = 'f0016ef6a83fe27a6188d2f5106d90c4'
    const redirectUrl = 'http://192.168.111.145:3000/redirect'
    const responseType = 'code'

    const getKakaoResponseCode = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=${responseType}&scope=friends,talk_message`
    }

    useEffect(() => {
        getKakaoResponseCode()
    }, [])

    return (
        <>
            <button onClick={() => {getKakaoResponseCode()}}>
                카카오톡 로그인
            </button>
        </>
    )
}

export default Home