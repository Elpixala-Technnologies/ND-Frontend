import ManagePopularCategory from '@/src/Components/Dashboard/PopularCategory/ManagePopularCategory/ManagePopularCategory';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import AdminAccessRoute from '@/src/PrivetRoute/AdminAccessRoute';
import React from 'react';

const ManagePopularCategoryPage = () => {
    return (
        <DashboardLayout>
            <AdminAccessRoute>
                <section>
                    <div className="container-fluid">
                        <ManagePopularCategory />
                    </div>
                </section>
            </AdminAccessRoute>
        </DashboardLayout>
    );
};

export default ManagePopularCategoryPage;