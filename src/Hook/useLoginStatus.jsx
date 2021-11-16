import { useState } from 'react'

const useLoginStatus = () => {
    const [isLogin, setIsLogin] = useState(false);

    function toggleLoginStatus() {
        setIsLogin(!isLogin);
        console.log('a')
    }

    return {
        isLogin,
        toggleLoginStatus,
    }
};

export default useLoginStatus;