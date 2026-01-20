import {useCalendarCell,useFocusRing,mergeProps} from 'react-aria';
import {useRef} from 'react'
import {CalendarState} from 'react-stately'
import {CalendarDate,isToday,getLocalTimeZone,isSameMonth} from '@internationalized/date'
import {cn} from '../../../lib/utils'
import { Dot } from 'lucide-react';

interface CalendarCellProps{
    state:CalendarState;
    date:CalendarDate,
    currentMonth:CalendarDate;
    isUnavailable?:boolean
}



export const CalendarCell = ({ state, date,currentMonth,isUnavailable }:CalendarCellProps)=> {
  let ref = useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    formattedDate
  } = useCalendarCell({ date }, state, ref);

  const {focusProps,isFocusVisible} = useFocusRing();
  const isDateToday  = isToday(date,getLocalTimeZone())
  const isOutsideOfMonth = !isSameMonth(currentMonth,date)
  const finallyDisabled = isDisabled || isUnavailable

  return (
    <td {...cellProps} className={`py-0.5 px-0.5 relative ${isFocusVisible?'z-10':'z-0'}`}>
      <div
      className='size-10 outline-none group rounded-md'
        {...mergeProps(buttonProps,focusProps)}
        ref={ref}
        // hidden={isOutsideOfMonth}
      >
       <div className={cn(
        'px-3 py-2 rounrded-sm cursor-pointer flex items-center justify-center text-sm font-semibold',
        isSelected?'bg-primary text-white ':'',

        finallyDisabled?'cursor-not-allowed text-muted-foreground':'',

        (!isSelected && !finallyDisabled) ? ' bg-secondary ':'' 
       )}>
      
          {formattedDate} {
            isDateToday&&<Dot className='absolute top-0 left-1'/>
          } 

        {/* {isDateToday&&(
          <div className={cn('h-5 w-6 p-4 absolute bottom-0 z-50 left-1/2 transform -translate-x-1.5 translate-y-1/2 size-1.5 bg-white rounded-full',
          isSelected&&'bg-white'

          )}></div>
        )} */}
       </div>
      </div>
    </td>
  );
}