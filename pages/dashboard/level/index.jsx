import AddLevel from '@/src/Components/Dashboard/Level/AddLevel/AddLevel';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import AdminAccessRoute from '@/src/PrivetRoute/AdminAccessRoute';
import React from 'react';

const LevelPage = () => {
    return (
        <DashboardLayout>
            <AdminAccessRoute>
                <section>
                    <AddLevel />
                </section>
            </AdminAccessRoute>
        </DashboardLayout>
    );
};

export default LevelPage;