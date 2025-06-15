import React from 'react';

const Greetings = () => {
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return "Good Morning";
        } else if (hour >= 12 && hour < 15) {
            return "Good Afternoon";
        } else if (hour >= 15 && hour < 20) {
            return "Good Evening";
        } else {
            return "Good Night";
        }
    };
    return (
        <div>
            <h2 className='text-popover-foreground text-2xl'>{getGreeting()}, <span className="font-semibold text-popover-foreground">Mohaiminul Islam</span></h2>
            <p>Let’s make today productive. You’ve got this!</p>
        </div>
    );
};

export default Greetings;