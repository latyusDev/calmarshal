import {format,parse} from 'date-fns'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import { Prisma } from '@/app/generated/prisma/client'
import { nylas } from "@/app/lib/nylas";

interface TimeTableProps{
    selectedDate:Date;
    userName:string
}

const getData = async(userName:string,selectedDate:Date)=>{
    const currentDay = format(selectedDate,'EEEE')
    const startOfDay = new Date(selectedDate);
    console.log(startOfDay,'startOfDay')
    startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23,59,59,999);

    const data = await prisma.availability.findFirst({
        where:{
            day:currentDay as Prisma.EnumDayFilter,
            user:{
                userName
            }
        },
        select:{
            fromTime:true,
            tillTime:true,
            id:true,
            user:{
                select:{
                    grantEmail:true,
                    grantId:true
                }
            }
        }
    })
    const nylasCalendarData = await nylas.calendars.getFreeBusy({
        identifier:data?.user?.grantId as string,
        requestBody:{
            startTime:Math.floor(startOfDay.getTime()/1000),
            endTime:Math.floor(endOfDay.getTime()/1000),
            emails:[data?.user?.grantEmail as string]
        }
    })
    if(!data){
        return notFound()
    }
    return {data,nylasCalendarData};
}

const calculateAvailableTimeSlots =(date:string,dbAvailability:{
    fromTime:string|undefined;
    tillTime:string|undefined;
})=>{
    const now = new Date();

    const availableFrom = parse(
        `${date}  ${dbAvailability.fromTime}`,
         'yyyy-MM-dd HH:mm',
         new Date()
    )
}

export const TimeTable = async({selectedDate,userName}:TimeTableProps)=>{
    const {data,nylasCalendarData} = await getData(userName,selectedDate);
    return(
        <div>
            <p className='text-base font-bold'>{format(selectedDate, 'EEE')}{' '}<span className='text-muted-foreground'>{format(selectedDate,'MMM. d')}</span></p>
            
        </div>
    )
}