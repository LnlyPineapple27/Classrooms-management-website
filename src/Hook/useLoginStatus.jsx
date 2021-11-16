import { useState } from 'react'

const useLoginStatus = () => {
    const [isLogin, setIsLogin] = useState(false);

    function toggleLoginStatus() {
        setIsLogin(!!localStorage.getItem('token'));
    }

    return {
        isLogin,
        toggleLoginStatus,
    }
};

export default useLoginStatus;