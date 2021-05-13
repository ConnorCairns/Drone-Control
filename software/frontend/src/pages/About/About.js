import React from 'react';
import './about.css'
import info from '../../assets/img/info.svg'

const Card = ({ message, link, linkName }) => {
    return (
        <div className="w-full">
        <div className="w-full">
            <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
                <svg className="w-6 h-6 transform -rotate-90 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                {link ? 
                    <span>{message} <a href={link} className="font-bold">{linkName}</a></span>
                    :
                <span>{message}</span>
                } 
            </div>
        </div>
    </div>
    )
}

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 h-max">
            <div className="mx-auto my-60">
                <div>

                    <div className="bg-white relative shadow-md w-5/6 mx-auto">
                        <div className="flex justify-center">
                            <img src={info} alt="info" className="mx-auto rounded-lg bg-white py-2 absolute -top-12 w-24 h-24 shadow-2xl border-4 border-white" />
                        </div>

                        <div className="mt-16">
                            <h1 className="font-bold text-center text-3xl text-gray-900 mb-5">about</h1>
                            <Card message="Made by University of Bristol students" />
                            <Card message="Drone Control is open source and the source code can be found" link="https://github.com/ConnorCairns/Drone-Control" linkName="here" />
                            <Card message="Drone simulator provided by" link="https://jsturm.de/wp/teaching/autonavx-slides/" linkName="AUTONAVx" />
                            <Card message="Program data is stored in local storage, no tracking information is ever stored and no data ever reaches our servers" />
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-auto footer">
                <div>Icons made by <a className="hidden-link" href="https://www.freepik.com" title="Freepik">Freepik</a> from <a className="hidden-link" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
        </div>
    );
}

export default About