import React, { useState, useEffect } from 'react';
import {
  CalendarStyle,
  ContentPopover,
  ContentPopoverErr,
  LoaderMonthWrapper,
} from './MonthStatsTable.styled';
import icons from '../../img/icons.svg';
import { Popover } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { getMonthWater } from 'redux/monthWater/monthWaterThunk';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoadingMonthWater,
  selectMonthWaterDetails,
} from 'redux/monthWater/monthWaterselectors';
import { formatDate } from 'redux/waterDetails/helpers';
import Loader from 'components/Loader/Loader';

import {
  selectIsLoadingList,
  selectNorma,
  selectTodayWater,
} from 'redux/waterDetails/waterSelectors';

import { isToday } from 'date-fns';
import { useTranslation } from 'react-i18next';

const MonthStatsTable = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const isLoadingMonth = useSelector(selectIsLoadingMonthWater);
  const monthWater = useSelector(selectMonthWaterDetails);

  const { waterlist } = useSelector(selectTodayWater);
  const isLoadingList = useSelector(selectIsLoadingList);

  const dailyNorm = useSelector(selectNorma);

  const d = formatDate(currentDate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonthWater(d));
  }, [dispatch, d, waterlist, dailyNorm, isLoadingList]);

  const handleChangeMonth = offset => {
    setCurrentDate(
      prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + offset)
    );
  };

  const getMonthBounds = date => {
    return {
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
  };

  const getBorderStyle = percentage => {
    if (percentage < 100) {
      return 'border';
    } else if (percentage >= 100) {
      return 'border-green';
    }
  };

  const getMonthDays = date => {
    const { start, end } = getMonthBounds(date);

    return eachDayOfInterval({ start, end });
  };
  const getFormattedDateWithTime = date =>
    formatDate(new Date(date.setHours(0, 0, 0, 0)));

  const renderPopover = data => {
    const dateText = selectedDate.textContent;
    const dateObj = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dateText
    );
    const formattedDateWithTime = getFormattedDateWithTime(dateObj);

    if (!data || data.length === 0) {
      return (
        <Popover
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          id="alex"
          open={Boolean(selectedDate)}
          anchorEl={selectedDate}
          onClose={() => setSelectedDate(null)}
          slotProps={{
            paper: { elevation: 3 },
          }}
          transitionDuration={{
            enter: 500,
            exit: 500,
          }}
        >
          <ContentPopoverErr>
            <h3 className="datePopover">{format(dateObj, 'd MMMM yyyy')}</h3>
            <p className="errText">No information</p>
            <button
              className="closeBtnPopover"
              onClick={() => setSelectedDate(null)}
            >
              <svg width="14" height="14">
                <use href={icons + '#icon-close-day-details'}></use>{' '}
              </svg>
            </button>
          </ContentPopoverErr>
        </Popover>
      );
    }

    const waterInfo = data.find(
      item =>
        getFormattedDateWithTime(new Date(item._id)) === formattedDateWithTime
    );
    if (waterInfo) {
      return (
        <Popover
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          id="alex"
          open={Boolean(selectedDate)}
          anchorEl={selectedDate}
          onClose={() => setSelectedDate(null)}
          slotProps={{
            paper: { elevation: 3 },
          }}
          transitionDuration={{
            enter: 500,
            exit: 500,
          }}
        >
          <ContentPopover>
            <p className="datePopover">{format(dateObj, 'd,MMMM')}</p>
            <p className="datePopoverText">
              {t('dailyNorma')}
              <span className="popoverColorText">
                {waterInfo.dailyNorma / 1000}L
              </span>
            </p>
            <p className="datePopoverText">
              {t('fulfillment')}
              <span className="popoverColorText">
                {waterInfo.persent.toFixed(0)}%
              </span>
            </p>
            <p className="datePopoverText">
              {t('servingsOfWater')}
              <span className="popoverColorText">{waterInfo.perDay}</span>
            </p>
            <button
              className="closeBtnPopover"
              onClick={() => setSelectedDate(null)}
            >
              <svg width="14" height="14">
                <use href={icons + '#icon-close-day-details'}></use>{' '}
              </svg>
            </button>
          </ContentPopover>
        </Popover>
      );
    }
  };

  return (
    <CalendarStyle>
      <div className="header">
        <span className="sectionText">{t('month')}</span>
        <div className="monthNav">
          <button className="navBtn" onClick={() => handleChangeMonth(-1)}>
            <svg width="14" height="14">
              <use href={icons + '#icon-arrow-left'}></use>
            </svg>
          </button>
          <h2 className="dateText">{format(currentDate, 'LLLL, yyyy')}</h2>
          <button className="navBtn" onClick={() => handleChangeMonth(1)}>
            <svg width="14" height="14">
              <use href={icons + '#icon-arrow-right'}></use>{' '}
            </svg>
          </button>
        </div>
      </div>
      {isLoadingMonth ? (
        <LoaderMonthWrapper>
          <Loader />
        </LoaderMonthWrapper>
      ) : (
        <ul className="month">
          {selectedDate && renderPopover(monthWater)}
          {getMonthDays(currentDate).map(date => {
            const waterAdded = waterlist.some(water => {
              return (
                format(new Date(water.time), 'yyyy-MM-dd') ===
                format(date, 'yyyy-MM-dd')
              );
            });

            return (
              <li key={format(date, 'yyyy-MM-dd')} className="day">
                <button
                  className={`calendarDayBtn ${isToday(date) ? 'today' : ''} 
                  ${
                    waterAdded
                      ? `${getBorderStyle(
                          monthWater.find(
                            item =>
                              getFormattedDateWithTime(new Date(item._id)) ===
                              getFormattedDateWithTime(date)
                          )?.persent
                        )}`
                      : ''
                  }`}
                  onClick={e => setSelectedDate(e.target)}
                >
                  {format(date, 'd')}
                </button>
                <p className="progressWaterText">
                  {monthWater
                    .find(
                      item =>
                        getFormattedDateWithTime(new Date(item._id)) ===
                        getFormattedDateWithTime(date)
                    )
                    ?.persent.toFixed(0) || 0}
                  %
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </CalendarStyle>
  );
};

export default MonthStatsTable;
