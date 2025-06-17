'use client';
import dynamic from 'next/dynamic';
const LottiePlayer = dynamic(() => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), { ssr: false });
const Error = () => {
    return (
        <div>
            <LottiePlayer
                autoplay
                loop
                src="/error.json"
                style={{ height: 'auto' }}
                className="w-1/2" />
        </div>
    );
};

export default Error;