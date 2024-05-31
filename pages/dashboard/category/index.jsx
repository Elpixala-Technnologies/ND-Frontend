import AddCategory from "@/src/Components/Dashboard/Category/AddCategory/AddCategory";
import DashboardLayout from "@/src/Layouts/DashboardLayout";
import AdminAccessRoute from "@/src/PrivetRoute/AdminAccessRoute";
import React from "react";

const CategoryPage = () => {
  return (
    <DashboardLayout>
      <AdminAccessRoute>
        <section className="container">
          <AddCategory />
        </section>
      </AdminAccessRoute>
    </DashboardLayout>
  );
};

export default CategoryPage;
