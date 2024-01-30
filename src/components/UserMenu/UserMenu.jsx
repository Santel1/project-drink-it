import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { selectAuthAuthenticated } from 'redux/auth/auth.selectors';

import {
  UserContainer,
  NavLinkSignin,
  UserSvg,
  Avatar,
  ArrowDownSvg,
  SettingSvg,
} from './UserMenu.styled';
import icons from '../../img/icons.svg';
import avatar from '../../img/avatar.png';

import { menuStyle } from './menu-style';
import Setting from 'components/Setting/Setting';
import { logoutThunk } from 'redux/auth/thunk';

const UserMenu = () => {
  const dispatch = useDispatch();

  const authenticated = useSelector(selectAuthAuthenticated);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const UserName = 'David';

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    dispatch(logoutThunk());
  };

  const handleClose = e => {
    setAnchorEl(null);
    if (e.target.classList.contains('logout')) {
      onLogout();
      return;
    }
    setIsOpenSetting(true);
  };

  const closeModal = () => {
    setIsOpenSetting(false);
  };

  return (
    <>
      {authenticated ? (
        <>
          <UserContainer to="signin">
            {UserName}
            <Avatar src={avatar} alt={UserName} width="28" height="28" />

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                padding: '0',
                minWidth: '16px',
              }}
            >
              <ArrowDownSvg width="16" height="16">
                <use href={icons + '#icon-arrow-down'}></use>
              </ArrowDownSvg>
            </Button>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              sx={menuStyle}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem className="setting" onClick={handleClose}>
                <SettingSvg width="16" height="16">
                  <use href={icons + '#icon-cog-tooth'}></use>
                </SettingSvg>
                Settings
              </MenuItem>
              <MenuItem className="logout" onClick={handleClose}>
                <SettingSvg width="16" height="16">
                  <use href={icons + '#icon-log-out'}></use>
                </SettingSvg>
                Log out
              </MenuItem>
            </Menu>
          </UserContainer>
          {isOpenSetting && <Setting closeModal={closeModal} />}
        </>
      ) : (
        <NavLinkSignin to="signin">
          <span>Sign in</span>
          <UserSvg width="28" height="28">
            <use href={icons + '#icon-user'}></use>
          </UserSvg>
        </NavLinkSignin>
      )}
    </>
  );
};

export default UserMenu;
