import { useState } from 'react';
import { Link } from 'react-router-dom';
// import NavItem from './navItem';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import classes from '../header/MainNavigation.module.css';
import SettingsIcon from '@mui/icons-material/Settings';

const Navigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Keep my Receipt</Link>
      </div>
      <nav>
        <ul>
          <li className="menu">
            <Link to="/book/index">거래내역</Link>
          </li>
          <li className="menu">
            <Link to="/club">분석</Link>
          </li>
          <li className="menu">
            <Link to="/">거래등록</Link>
          </li>
          <li className="menu">
            <Link to="/">모임관리</Link>
          </li>
          <li className="menu">
            <Link to="/">보고서</Link>
          </li>
          <div className={classes.mobile}>
            <Link to="/alert/index">
              <NotificationsActiveIcon />
            </Link>
          </div>
          <div className={classes.mobile}>
            <Link to="/setting/index">
              <SettingsIcon />
            </Link>
          </div>
        </ul>

        <div className={classes.mobile}></div>
      </nav>
    </header>
  );
};

export default Navigation;
