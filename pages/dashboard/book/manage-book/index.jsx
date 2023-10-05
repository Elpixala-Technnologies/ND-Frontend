import ManageBook from '@/src/Components/Dashboard/Book/ManageBook/ManageBook';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import AdminAccessRoute from '@/src/PrivetRoute/AdminAccessRoute';

const ManageBookPage = () => {
  return (
    <DashboardLayout>
      <AdminAccessRoute>
        <div className='manage-book-section container'>
          <div className='manage-book-title my-2'>
            <h2 className='font-bold text-2xl'>Update Books</h2>
          </div>
          <ManageBook />
        </div>
      </AdminAccessRoute>
    </DashboardLayout>
  );
};

export default ManageBookPage;