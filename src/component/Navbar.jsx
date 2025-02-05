import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBarsStaggered } from "react-icons/fa6"
import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import NavLinks from './NavLinks';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/Users/UserSlice';



function Navbar() {
    const dispatch = useDispatch();

    const handleTheme = () => {
        console.log("Toggling theme...");
        dispatch(toggleTheme());
    }

    const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart) || 0;

    // Log the value in the component
    console.log("numItemsInCart in Navbar:", numItemsInCart);


    return (
        <nav className='bg-base-200'>
            <div className='navbar align-element'>
                <div className="navbar-start">
                    {/* {Tittle} */}
                    <NavLink
                        to='/'
                        className='hidden lg:flex btn btn-primary text-3xl items-center '
                    >
                        M
                    </NavLink>
                    {/* DROPDOWN */}
                    <div className='dropdown dropdown-hover'>
                        <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                            <FaBarsStaggered className='h-6 w-6' />
                        </label>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'
                        >
                            <NavLinks />
                        </ul>
                    </div>
                </div>
                {/* navbar link */}
                <div className="navbar-center hidden lg:flex space-x-4">
                    <ul className="menu menu-horizontal ">
                        <NavLinks />
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* {THEME} */}
                    <label className='swap swap-rotate'>
                        <input type='checkbox'  onChange={handleTheme}/>
                        {/* sun icon*/}
                        <BsSunFill className='swap-on h-4 w-4' />
                        {/* moon icon*/}
                        <BsMoonFill className='swap-off h-4 w-4' />
                        </label>
                        {/* CART LINKS */}
                        <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
                            <div className="indicator">
                                <BsCart3 className='h-6 w-6' />
                                <span className='badge badge-sm badge-primary indicator-item'>
                                {numItemsInCart}
                                </span>
                            </div>
                        </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
