// import React from 'react'

const About = () => {
  return (
    <>
    <div className="container">
      {/* Header section */}
      <div className="grid grid-cols-3 justify-between items-center py-10">
        <div className="col-span-2">
        <h1 className="text-4xl xl:text-5xl font-bold   tracking-normal pb-3">
        We offers countless fun <br/> activities here in <span className="text-primary">Selingan</span>.
        </h1>
        <h1 className="text-4xl xl:text-5xl max-w-[1000px] tracking-normal font-bold">Join or create your own Ragam</h1>
        </div>
        <div className="col-3 pl-5">
        <p className="xl:text-xl pb-4">Find interesting activities or host your own event to make an unforgettable break in your day!</p>
        <a href="/profile">
                  <button
                    
                    type='submit'
                    className="primary-btn hover:bg-primary duration-300">Explore Now &#8594;</button></a>
        {/* <button className="primary-btn hover:bg-primary duration-300">Mulai Eksplor &#8594;</button> */}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-5 gap-8 pt-6">
        <div className="col-span-2 bg-[#E7DBFF] px-8 py-10 rounded-3xl">
          {/* image */}
          <img className="w-14 h-14 rounded-full object-contain p-0 bg-[#A38EC9]" src="activites-icon.png" alt="" />

          {/* Heading */}
          <h2 className="text-3xl xl-text-4xl pt-8 pb-8">Endless Fun, Tailored to Your Interests</h2>

          {/* text */}
          {/* <p className="xl:text-xl leading-loose">Looking to expand your skill and explore your creaticity? Our hands-on creative classes are the perfect way to learn at your own pacce and discover new talents.</p> */}
          <p className="xl:text-xl leading-loose">Escape your routine with Selingan—explore hundreds of fun one-day activities, all suited to your interests and nearby location!</p>
        </div>
        <div className="col-span-3 bg-[#A99DCF] px-8 py-8 rounded-3xl">
          {/* image */}
          <img className="w-14 h-14 rounded-full bg-[#6C588B]" src="events-icon.png" alt="" />

          {/* Heding */}
          <h2 className="text-3xl xl-text-4xl pt-8 pb-10">Organize a creative event and find others who share your passion!</h2>

          {/* text */}
          <p className="xl:text-xl leading-loose">With Selingan, you're not just a participant, you're the creator! Selingan lets you design your own events, invite friends, and welcome others to join. Unleash your creativity, meet new people, and enjoy every moment!</p>
        </div> 

      </div>

        {/* Feature */}
        <div className="flex items-center gap-5 pt-[60px] pb-[80px]">
          {/* Title */}
          <h3 className="text-2xl xl:text-3xl font-bold tracking-wider max-w-[300px]">
            Only on Selingan
          </h3>

          {/* Features List */}
          <div className="flex items-center gap-8 text-lg">
            <div className="bg-gray-200 rounded-full py-2 px-6 text-center">
              Many Activities
            </div>
            <div className="bg-gray-200 rounded-full py-2 px-6 text-center">
              Organized Schedule
            </div>
            <div className="bg-gray-200 rounded-full py-2 px-6 text-center">
              Create Ragam
            </div>
            <div className="bg-gray-200 rounded-full py-2 px-6 text-center">
              Find Friends
            </div>
          </div>
        </div>

      <hr className=""/>
    </div>
    </>
  )
}

export default About