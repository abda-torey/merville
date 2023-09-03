import React from 'react'
import Link from 'next/link'

const  notFound = () => {
  return (
            <section className="relative h-screen  font-poppins">
            <div className="absolute top-0 left-0 w-full h-full bg-white  "></div>
            <div className="flex items-center h-screen">
                <div className="container relative justify-center px-4 mx-auto text-center">
                    <h1 className="inline-block mb-8 font-semibold text-gray-700 text-7xl lg:text-9xl">Error 404</h1>
                    <h2 className="mb-8 text-2xl font-semibold text-gray-700 lg:text-4xl ">Page not found</h2>
                    <p className="mb-8 text-xl text-gray-700 ">
                        Sorry! we are unable to find the page that you are looking for...
                    </p>
                    <div className="flex flex-wrap items-center justify-center">
                        <Link href='/' className="px-8 py-4 mb-4 mr-4 text-sm font-medium text-gray-100 bg-blue-600 rounded-full hover:bg-blue-800 md:w-auto">
                            Back Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default notFound