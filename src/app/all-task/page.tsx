import React from 'react';
import DashboardLayout from '../page';

const page = () => {
    return (
        <DashboardLayout>
            <section className='grid grid-cols-3 gap-3'>
                <div className="border-2 border-red-500"></div>
                <div className="border-2 border-red-500"></div>
                <div className="border-2 border-red-500"></div>
            </section>
        </DashboardLayout>
    );
};

export default page;