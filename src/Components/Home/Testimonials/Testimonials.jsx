import React from 'react';
import OwlCarousel from 'react-owl-carousel';

const TestimonialSection = () => {
  const testimonialData = [
    {
      text: "Why is this important? Because clients want to know the businesses they depend on for advice, are well managed in their own right. Not only that but this event gives you the chance to give your back-office team",
      name: "Mahfuz Riad",
      designation: "UI Designer & CEO",
      image: "http://t.commonsupport.com/adro/images/resource/thumb-1.jpg"
    },
    // Add more testimonial data as needed
  ];

  const testimonialItems = testimonialData.map((testimonial, index) => (
    <div key={index} className="testimonial-block">
      <div className="inner-box">
        <div className="text">{testimonial.text}</div>
        <div className="info-box">
          <div className="thumb"><img src={testimonial.image} alt="" /></div>
          <h4 className="name">{testimonial.name}</h4>
          <span className="designation">{testimonial.designation}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="testimonial-section">
      <div className="large-container">
        <div className="sec-title">
          <span className="title">Testimonial</span>
          <h2>What Our core client say ?</h2>
        </div>

        <OwlCarousel
          className="testimonial-carousel owl-carousel owl-theme"
          animateOut="slideOutDown"
          animateIn="zoomIn"
          loop={true}
          margin={0}
          nav={true}
          smartSpeed={300}
          autoplay={7000}
          navText={['<span class="arrow-left"></span>', '<span class="arrow-right"></span>']}
          responsive={{
            0: { items: 1 },
            600: { items: 1 },
            800: { items: 1 },
            1024: { items: 1 }
          }}
        >
          {testimonialItems}
        </OwlCarousel>

        <div className="thumb-layer paroller">
          <figure className="image"><img src="http://t.commonsupport.com/adro/images/resource/user-thumbs.png" alt="" /></figure>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
