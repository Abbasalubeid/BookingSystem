import React from 'react';
import Navbar from '@/components/Navbar';

const NavbarView = ({ onLogout, isAdmin }) => {
    return (
        <Navbar onLogout={onLogout} isAdmin={isAdmin}/>
    
      );
};

export default NavbarView;
