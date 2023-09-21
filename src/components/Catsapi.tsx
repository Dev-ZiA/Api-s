'use client'
import { data } from 'autoprefixer';
import { error } from 'console';
import { METHODS } from 'http';
import { RotatingSquare } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';

const CatsApi = () => {

    const [cats, setCats] = useState<any[]>([]);
    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('Aphrodite Giant');
    const [minWeight, setMinWeight] = useState('');
    const [minLifeExp, setMinLifeExp] = useState('');

    const getCats = () => {
        if (name.length > 0 || minWeight.length > 0 || minLifeExp.length > 0) {
            const apiUrl = `https://api.api-ninjas.com/v1/cats?name=${name}&min_weight=${minWeight}&max_life_expectancy=${minLifeExp}`;
            setLoader(true);
            fetch(apiUrl, {
                method: 'GET',
                headers: { 'X-Api-Key': 'JFFpjFL1Dfy0wN+Ozj6ZTw==qo8PKkCpUaZilwzq' }
            })
                .then(response => response.json())
                .then(data => { setCats(data); setLoader(false) })
                .catch(error => `Error`);
        } else {
            alert('Please enter a name or minimum weight and life expectancy')
        }
    }

    useEffect(() => {
        getCats();
    }, [])

    return (
        <>
            <h1 style={{marginTop: '35px'}} className=" mb-10 mt-15 text-center text-3xl font-bold tracking-wide text-gray-800 lg:text-5xl">Cats Search Api</h1>
            <div className=" p-6 rounded-lg max-w-screen-lg mx-auto w-full flex items-center space-x-4">
                <input type="text" className="border rounded-lg px-4 py-2 w-[25%] focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input type="text" className="border rounded-lg px-4 py-2 w-[25%] focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Minimum Weight"
                    value={minWeight}
                    onChange={(e) => setMinWeight(e.target.value)} />
                <input type="text" className="border rounded-lg px-4 py-2 w-[25%] focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Minimum Life Expectancy"
                    value={minLifeExp}
                    onChange={(e) => setMinLifeExp(e.target.value)} />
                <button type='button' className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => getCats()}>Search</button>
            </div>
            {loader ? <div className='flex items-center justify-center h-screen'><RotatingSquare
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /></div>
                : cats.length > 0 ? cats.map(cat => {
                    return <section key={cat.name} className="bg-white">
                        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                            <div className="mr-auto place-self-center lg:col-span-7">
                                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">{cat.name}</h1>
                                <div className="mt-8 space-y-5">
                                    <p className="flex items-center -mx-2 text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="mx-2">Origin: {cat.origin}</span>
                                    </p>
                                    <p className="flex items-center -mx-2 text-gray-700 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="mx-2">Min Weight: {cat.min_weight}</span>
                                    </p>
                                    <p className="flex items-center -mx-2 text-gray-700 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="mx-2">Length: {cat.length}</span>
                                    </p>
                                    <p className="flex items-center -mx-2 text-gray-700 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="mx-2">Min Life Expectancy: {cat.min_life_expectancy}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
                                <img src={cat.image_link} alt="mockup" className="rounded-lg" />
                            </div>
                        </div>
                        <hr className="border-t-2 border-gray-700" />
                    </section>
                }) : <div className="flex items-center justify-center h-screen">
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

        </>
    );
};

export default CatsApi;