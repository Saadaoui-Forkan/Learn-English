import Link from 'next/link'
import React from 'react'
import logo from '../../public/icon.png'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="text-sm my-2 text-slate-600 py-4 flex items-center justify-center">
      <div className="flex items-center justify-center space-x-2">
        <Image
          alt="Logo"
          src={logo}
          width={20}
          height={20}
          className="rounded-full"
        />
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SaadaouiDev. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer