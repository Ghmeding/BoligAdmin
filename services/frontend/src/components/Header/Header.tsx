import React from "react";
import './Header.scss';

interface HeaderProps {
  header: string;
}

const Header: React.FC<HeaderProps> = ({ header }) => (
    <div className='header'>
        <h2>{header}</h2>
    </div>
);


export default Header;