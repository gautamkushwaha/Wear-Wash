// src/components/BackgroundSection.jsx
import React from 'react';

const BackgroundSection = () => {
  return (
    <section className="relative bg-cover bg-center min-h-screen mt-[50px]" style={{ backgroundImage: 'url(/background_image.svg)' }}>
      <div className="flex flex-col md:flex-row items-center justify-between w-full h-full  bg-opacity-50 p-8 pt-[250px] pb-[100px] px-[120px] gap-[50px]">
        {/* Left Side - Text */}
        <div className="md:w-1/2 text-white p-4">
        <p className='text-[28px] font-regular'>About us</p>
          <h2 className="text-6xl font-bold mb-4 text-[#232240]">HOW IT WORKS</h2>
          <p className="mb-5 text-2xl font-regular">We believe doing your laundry should be convenient for you and hassle-free.</p>
          <p className="mb-5 text-2xl font-regular">We offer a variety of services for flawless professional cleaning for your clothes.</p>
          <ul className="mb-4 list-disc list-inside text-2xl font-regular">
            <li>Upto 6kg per Load</li>
            <li>Book Your slot at your continence</li>
            <li>Notification once the wash is completed</li>
          </ul>
          <p className="mb-4 text-2xl font-regular">We make sure your washing is done and in perfect conditions, giving you time to get on with the rest of your day.</p>
          <button className="px-5 py-3 bg-white text-black font-semibold rounded hover:bg-blue-600 text-xl">Book Now</button>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 items-center justify-center text-center my-auto">
          <img src="/Male_female_washing_clothe.svg" alt="Right Side" className="w-[100%] h-auto object-cover rounded px-[50px]" />
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;
