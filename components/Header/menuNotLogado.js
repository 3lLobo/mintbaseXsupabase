import React from 'react'
import Link from 'next/link'

const MenuNotLogado = ({ handleLogin }) => (
    <div className="flex space-x-4">
        <button
            onClick={handleLogin}
        >
            <a className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Log In
            </a>
        </button>
    </div>
)

export default MenuNotLogado
