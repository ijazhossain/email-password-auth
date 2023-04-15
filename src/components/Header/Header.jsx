import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='d-flex align-items-center justify-content-between w-25 mx-auto my-5 fs-5'>
            <Link className='text-decoration-none me-4 font-bold text-black' to='/'>Home</Link>
            <Link className='text-decoration-none me-4 font-bold text-black fs-5' to='/register'>Register</Link>
            <Link className='text-decoration-none me-4 font-bold text-black fs-5' to='/login'>Login</Link>
            
        </nav>
    );
};

export default Header;