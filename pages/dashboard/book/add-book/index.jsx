import AddBook from '@/src/Components/Dashboard/Book/AddBook/AddBook';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import AdminAccessRoute from '@/src/PrivetRoute/AdminAccessRoute';
import Link from "next/link";

const AddBookPage = () => {
    return (
        <DashboardLayout>
            <AdminAccessRoute>
                <section>
                    <div className="add-book-container">
                        <Link href="/dashboard/book/manage-book" className="common-btn">
                            Update Book
                        </Link>
                    </div>

                    <div className="add-book-section">
                        <AddBook />
                    </div>
                </section>
            </AdminAccessRoute>
        </DashboardLayout>
    );
};

export default AddBookPage;