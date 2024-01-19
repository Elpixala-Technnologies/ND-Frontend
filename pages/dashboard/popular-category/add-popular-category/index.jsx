import AddPopularCategory from '@/src/Components/Dashboard/PopularCategory/AddPopularCategory/AddPopularCategory';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import AdminAccessRoute from '@/src/PrivetRoute/AdminAccessRoute';
import React from 'react';

const AddPopularCatgoryPage = () => {
    return (
        <DashboardLayout>
            <AdminAccessRoute>
                <section className='container-fluid'>
                    <AddPopularCategory />
                </section>
            </AdminAccessRoute>
        </DashboardLayout>
    );
};

export default AddPopularCatgoryPage;