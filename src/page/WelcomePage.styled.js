import styled from 'styled-components';
import imgMobile from '../img/bg_main_mobile.svg';
import imgTablet from '../img/bg_main_tablet.svg';
import imgDesktop from '../img/bg_main_desktop_group.svg';
// import botleDesktop from '../img/botle_welcome_desktop.svg';

export const LeftSide = styled.div`
  @media screen and (max-width: 767px) {
    margin-left: auto;
    margin-right: auto;

    width: 280px;

    margin-bottom: 40px;
  }

  @media screen and (min-width: 768px) {
    margin: 0;
  }

  @media screen and (min-width: 1440px) {
    width: 439px;
  }
`;

export const TitleLeft = styled.h2`
  margin-bottom: 16px;

  font-weight: 700;
  font-size: 28px;
  line-height: 1.14;

  @media screen and (min-width: 768px) {
    font-size: 36px;
    line-height: 1.17;
  }
`;

export const TextH3Left = styled.h3`
  margin-bottom: 24px;

  font-weight: 400;
  font-size: 24px;
  line-height: 1.25;

  @media screen and (min-width: 768px) {
    font-size: 26px;
    line-height: 1.23;
  }
`;

export const TextP = styled.p`
  margin-bottom: 12px;

  font-weight: 500;
  font-size: 18px;
  line-height: 1.11;
`;

export const ListLeft = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  @media screen and (min-width: 1440px) {
    flex-direction: column;
  }
`;

export const ItemLeft = styled.li`
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;

  @media screen and (min-width: 768px) {
    width: 224px;
  }
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 280px;
  height: 36px;
  padding: 8px 30px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;

  color: var(--primery-color-white);
  background-color: var(--primery-color-blue);

  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(64, 123, 255, 0.4);

  &:hover,
  &:focus {
    box-shadow: 0px 4px 14px 0px rgba(64, 123, 255, 0.54);
  }

  @media screen and (min-width: 768px) {
    min-width: 336px;
    height: 44px;
    margin-bottom: 60px;

    font-size: 18px;
    line-height: 1.33;
  }

  @media screen and (min-width: 1440px) {
    min-width: 384px;
    margin-bottom: 0;
  }
`;

export const RightSide = styled.div`
  display: block;
  padding: 24px 16px;

  max-width: 248px;
  margin-left: auto;
  margin-right: auto;

  background-color: #ecf2ff;

  /* border: 1px solid black; */
  border-radius: 10px;
  box-shadow: 0px 4px 14px 0px rgba(64, 123, 255, 0.3);

  @media screen and (min-width: 768px) {
    padding: 32px 24px;
    max-width: 446px;
    margin: 0;
    border: none;
  }

  @media screen and (min-width: 1440px) {
    max-width: 494px;

    margin-top: 34px;
  }
`;

export const TitleRight = styled.h3`
  margin-bottom: 12px;

  font-weight: 500;
  font-size: 18px;
  line-height: 1.11;
`;

export const ListRight = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ItemRight = styled.li`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-left: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;

  position: relative;
  &::before {
    position: absolute;
    left: 0;
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: var(--primery-color-blue);
    border-radius: 50%;
  }
`;

export const HomeWrapper = styled.section`
  @media screen and (min-width: 320px) {
    /* height: 100vh; */
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 24px;
    padding-bottom: 40px;
    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      top: 250px;
      left: 0;
      z-index: -10;
      background-image: url(${imgMobile});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  @media screen and (min-width: 768px) {
    /* background-size: contain; */
    padding-top: 40px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 50px;
    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -10;
      background-position: bottom;
      background-size: cover;
      background-image: url(${imgTablet});
    }
  }

  /* @media screen and (min-width: 769px) and (max-width: 1439px) {
    background-size: cover;
    background-image: url(${imgTablet});

    height: 100vh;
  } */

  @media screen and (min-width: 1440px) {
    position: relative;
    min-height: 691px;
    padding-top: 31px;
    padding-bottom: 294px;
    padding-left: 213px;
    padding-right: 213px;
    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 90vh;
      top: 2%;
      left: 0;
      z-index: -10;
      background-image: url(${imgDesktop});
      background-position: bottom;
      background-size: cover;
    }
    /* height: 100vh; */
  }
  /* @media screen and (min-width: 1441px) {
    background-size: cover;

    height: 100vh;
  } */
`;

export const Home = styled.div`
  @media screen and (min-width: 768px) {
  }
  @media (min-width: 1200px) {
    padding-left: 112px;
    padding-right: 112px;
  }
  @media screen and (min-width: 1440px) {
    display: flex;
    gap: 81px;
    justify-content: center;
  }
`;

export const Svg = styled.svg`
  width: 32px;
  height: 32px;

  @media screen and (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
