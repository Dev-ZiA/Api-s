'use client';
import React, { useState, useEffect } from 'react'
import { RotatingSquare } from 'react-loader-spinner';

const DogsAPIs = () => {
    const [dogs, setDogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('Bull');
    const [minWeight, setMinWeight] = useState('');
    const [minHeight, setMinHeight] = useState('');

    const getDogs = () => {
        if (name.length > 0 || minHeight.length > 0 || minWeight.length > 0) {

            const apiUrl = `https://api.api-ninjas.com/v1/dogs?name=${name}&min_weight=${minWeight}&min_height=${minHeight}`;
            setLoading(true);
            fetch(apiUrl, {
                method: 'GET',
                headers: { 'X-Api-Key': 'ECbf9vbOzSn9XI6pB3Y9LA==U2mxqMt1LWIrbiTc' },
            })
                .then(response => response.json())
                .then(data => { setDogs(data); setLoading(false) })
                .catch(error => setLoading(false));
        } else {
            alert('Enter atleast One Option')
        }
    }

    useEffect(() => {
      getDogs();
  }, [])
  
  return (
    <>
    <div className='bg-gray-800'>
    <h1 style={{paddingTop: '35px'}} className="mb-10 text-center text-3xl font-bold tracking-wide text-gray-800 dark:text-white lg:text-5xl">Dog Search Api</h1>
      <div className="bg-gray-800 p-6 rounded-lg max-w-screen-lg mx-auto w-full flex items-center space-x-4">
        <input type="text" className="border rounded-lg px-4 py-2 w-[25%] focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <input type="text" className="border rounded-lg px-4 py-2 w-[25%] focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Minimum Weight"
          value={minWeight}
          onChange={(e) => setMinWeight(e.target.value)} />
        <input type="text" className="border rounded-lg px-4 py-2 w-[25%] focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Minimum Height"
          value={minHeight}
          onChange={(e) => setMinHeight(e.target.value)} />
        <button type='button' className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => getDogs()}>Search</button>
      </div>

      {loading ? <div className='flex items-center justify-center h-screen'><RotatingSquare
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /></div> : dogs.length > 0 ? dogs.map(dog => {
        return <section key={dog.name} className="bg-white dark:bg-gray-800">
          <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white lg:text-5xl">
                  {dog.name}
                </h1>
                <div className="mt-8 space-y-5">
                  <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="mx-2">Male Max Weight: {dog.max_weight_male}, Female Max Weight: {dog.max_weight_female}</span>
                  </p>
                  <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="mx-2">Male Min Weight: {dog.min_weight_male}, Female Min Weight: {dog.min_weight_female}</span>
                  </p>
                  <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="mx-2">Male Max Height: {dog.max_height_male}, Female Max Height: {dog.max_height_female}</span>
                  </p>
                  <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="mx-2">Male Min Height: {dog.min_height_male}, Female Min Height: {dog.min_height_female}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
              <img className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
                src={dog.image_link} alt={dog.name + 'Image'} />
            </div>
          </div><hr />
        </section>
      }) : <div className="flex items-center justify-center ">
        <div className="min-h-screen text-white flex flex-col items-center justify-center">
      <div className="text-6xl font-extrabold mb-4">404</div>
      <div className="text-3xl font-semibold mb-6">Querry Not Found</div>
      <p className="text-lg text-center mb-8">
        Oops! It looks like the querry you are looking for doesn't exist.
      </p>
      <a
        href="/"
        className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold transition duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg"
      >
        Go back to the homepage
      </a>
    </div>
      </div>}
      </div>
    </>
  )
};


export default DogsAPIs;