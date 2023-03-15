import {useEffect, useState} from 'react';
import api from '../../api';
import {useSearchParams} from 'react-router-dom';

const FriendsRedirect = () => {
    const [searchParams] = useSearchParams();
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const token = userInfo.access_token
        if(searchParams.get('selected')){
            const users = JSON.parse(searchParams.get('selected')).users
            let uuids = []
            for(let i=0; i < users.length; i++){
                uuids.push(users[i].uuid)
            }
            console.log(uuids)
            api.sendMessage(uuids, token).then((res) => {
                setSuccess(true)
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [])

    return (
        <div>
            {
                success ? '전송완료!!' : ''
            }
        </div>
    )
}
export default FriendsRedirect