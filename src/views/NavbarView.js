import React from 'react';
import Navbar from '@/components/Navbar';

const NavbarView = ({ onLogout }) => {
    return (
        <Navbar onLogout={onLogout}/>
    
      );
};

export default NavbarView;
