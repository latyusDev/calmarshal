'use client'
import {useCalendar, useLocale} from 'react-aria';
import {useCalendarState} from 'react-stately';
import {createCalendar} from '@internationalized/date';
import {CalendarProps,DateValue} from '@react-types/calendar';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';



export const Calendar = (props:CalendarProps<DateValue>&{isDateUnavailable?:(date:DateValue)=>boolean})=>{
    let { locale } = useLocale();
  let state = useCalendarState({
    createCalendar,
    ...props,
    visibleDuration:{months:1},
    locale
  });

   let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );
    return(
        <div {...calendarProps} >
            <CalendarHeader 
            calendarProps={calendarProps}
            prevButtonProps={prevButtonProps}
            nextButtonProps={nextButtonProps}
            state={state} />
            <div className='flex gap-8 '>
                    <CalendarGrid state={state} isDateUnavailable={props.isDateUnavailable}  />
            </div>
    </div>
    )
}