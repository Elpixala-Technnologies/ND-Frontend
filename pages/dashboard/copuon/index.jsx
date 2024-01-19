import AddCoupon from '@/src/Components/Dashboard/Coupon/AddCoupon/AddCoupon';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import AdminAccessRoute from '@/src/PrivetRoute/AdminAccessRoute';
import React from 'react';

const CopuonPage = () => {
    return (
        <DashboardLayout>
            <AdminAccessRoute>
                <section className='container'>
                    <AddCoupon />
                </section>
            </AdminAccessRoute>
        </DashboardLayout>
    );
};

export default CopuonPage;