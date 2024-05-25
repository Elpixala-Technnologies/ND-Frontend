import UserdashboardLayout from '@/src/Layouts/UserDashboardLayout';
import { AuthContext } from '@/src/Context/UserContext';
import React, { useContext  } from 'react';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <UserdashboardLayout>
            <section className='container py-4'>
                <h1 className='text-[2rem] '>
                    Hey Welcome {user?.displayName}
                </h1>
                
            </section>
        </UserdashboardLayout>
    );
};

export default UserDashboard;