import React from 'react'

const Footer = () => {
  return (
    <footer className="text-sm m-2 bg-gray-100 text-slate-600 py-4 flex items-center justify-center absolute bottom-10 left-0 right-0">
      <div className="flex items-center justify-center space-x-2 z-50">
        All rights reserved
        <p className="text-sm">
          &copy;saadaouidev.com {new Date().getFullYear()} 
        </p>
      </div>
    </footer>
  )
}

export default Footer