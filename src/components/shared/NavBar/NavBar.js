import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BsCart4 } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { getCart } from '../../../utilities/localstorageDB/localstorageDB';


const NavBar = () => {
    const {user,logOut}= useAuth();

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">The Cafe Kitchen</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="all-foods">Foods</Nav.Link>
                            
                            <button  className="btn btn-primary position-relative p-2 border-0 bg-dark me-5">
                                <IconContext.Provider value={{ className: "text-warning fs-4" }}><BsCart4/></IconContext.Provider>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        9
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                            </button>
                            
                            {
                                user.email ? <button as={NavLink} onClick={()=>logOut()} className="bg-success text-white rounded border-0 fs-6">LogOut({user.displayName || user.email})</button> : <Nav.Link as={NavLink} to="/login" className="bg-primary text-white rounded border-0 fs-6">Login</Nav.Link>
                            }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;

