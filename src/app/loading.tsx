'use client'
import { Circles } from 'react-loader-spinner'
const Loading = () => {
    // loading
    return (
        <div className='flex justify-center min-h-screen items-center'>
            <Circles
                height="80"
                width="80"
                color="#5628a5"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default Loading;