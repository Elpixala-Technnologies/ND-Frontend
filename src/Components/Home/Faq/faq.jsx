import React from 'react'

const Faq = () => {
    return (
        <div className='flex flex-col items-center py-16 gap-6 bg-gradient-to-tr from-gray-600 via-gray-300 to-gray-50 rounded-3xl'> 
        <div className='flex flex-col items-center'>
        <h2 className='text-3xl'>FAQs</h2>
       
        <span className='text-xl'>Frequently Asked Questions About US: Answers to Common Concerns and Inquiries.</span>
        </div>
            <div className='faq mx-auto'>
                <input id='faq-a' type='checkbox' />
                <label htmlFor='faq-a'>
                    <p className="faq-heading">What are the shipping options and delivery times?</p>
                    <div className='faq-arrow'></div>
                    <p className="faq-text">We offer standard and express shipping options. Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days. International shipping times may vary.</p>
                </label>
                <input id='faq-b' type='checkbox' />
                <label htmlFor='faq-b'>
                    <p className="faq-heading">What is your return policy?</p>
                    <div className='faq-arrow'></div>
                    <p className="faq-text">You can return any book within 30 days of purchase for a full refund or exchange. The book must be in the same condition as when you received it. Please contact our customer service for return instructions.</p>
                </label>
                <input id='faq-c' type='checkbox' />
                <label htmlFor='faq-c'>
                    <p className="faq-heading">Are the books new or used?</p>
                    <div className='faq-arrow'></div>
                    <p className="faq-text">We sell both new and used books. The condition of each book is clearly stated in the product description. Used books may show signs of wear, but we ensure they are in good readable condition.</p>
                </label>
                <input id='faq-d' type='checkbox' />
                <label htmlFor='faq-d'>
                    <p className="faq-heading">How can I track my order?</p>
                    <div className='faq-arrow'></div>
                    <p className="faq-text">Once your order has been shipped, you will receive an email with a tracking number. You can use this number to track your order on our website or the carrier's website.</p>
                </label>
                <input id='faq-e' type='checkbox' />
                <label htmlFor='faq-e'>
                    <p className="faq-heading">Do you offer gift wrapping services?</p>
                    <div className='faq-arrow'></div>
                    <p className="faq-text">Yes, we offer gift wrapping services for an additional fee. You can select the gift wrapping option during checkout and include a personalized message if desired.</p>
                </label>
                <input id='faq-f' type='checkbox' />
                <label htmlFor='faq-f'>
                    <p className="faq-heading">Can I pre-order upcoming book releases?</p>
                    <div className='faq-arrow'></div>
                    <p className="faq-text">Yes, we accept pre-orders for upcoming book releases. Pre-ordered books will be shipped to you as soon as they are released.</p>
                </label>
                <input id='faq-g' type='checkbox' />
                <label htmlFor='faq-g'>
                    <p className="faq-heading">What payment methods do you accept?</p>
                    <div className='faq-arrow'></div>
                    <p className="faq-text">We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely to ensure your information is protected.</p>
                </label>
                <input id='faq-h' type='checkbox' />
                <label htmlFor='faq-h'>
                    <p className="faq-heading">Do you offer discounts for bulk purchases?</p>
                    <div className='faq-arrow'></div>
                    <p className="faq-text">Yes, we offer discounts for bulk purchases. Please contact our customer service team with your requirements, and we will provide you with a custom quote.</p>
                </label>
            </div>
        </div>
    )
}

export default Faq
