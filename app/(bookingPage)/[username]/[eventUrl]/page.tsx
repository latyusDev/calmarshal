import { Calendar } from '@/app/components/bookingForm/Calendar'
import { RenderCalender } from '@/app/components/bookingForm/RenderCalender'
import { requireUser } from '@/app/lib/hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/db'
import { CalendarX2, Clock, VideoIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'
const getData = async(url:string,userName:string)=>{
    const data = await prisma.eventType.findFirst({
        where:{
            url,
            user:{
                userName
            },
            active:true
        },
        select:{
            id:true,
            description:true,
            title:true,
            duration:true,
            videoSoftware:true,
            user:{
                select:{
                    image:true,
                    name:true,
                    availability:{
                        select:{
                            day:true,
                            isActive:true,
                        }
                    },
                }
            }
        }
    })
    if(!data){
        return notFound();
    }
    return data;
}

const BookingFormRoute = async({params}:{params:Promise<{username:string,eventUrl:string}>}) => {
    const {eventUrl,username} = await params
    const data = await getData(eventUrl,username);
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
        <Card className='max-w-[1000px] w-3/4 mx-auto'>
            {/* <CardContent className='p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]'> */}
            <CardContent className='p-5 flex justify-between '>
                <div className='flex-[0.5]'>
                    <img src={data.user?.image as string} alt='image' className='size-10 rounde-full '/>
                    <p className='text-sm font-medium text-muted-foreground mt-1 capitalize'>{data.user?.name}</p>
                    <h1 className='text-xl font-semibold mt-2'>{data.title}</h1>
                    <p className='text-sm font-medium text-muted-foreground'>{data.description}</p>
                    <div className='mt-5 flex flex-col gap-y-3'>
                        <p className='flex items-center '><CalendarX2 className='size-4 mr-2 text-primary' /> <span className='text-sm text-muted-foreground'>23. sept 2024</span> </p>
                        <p className='flex items-center mt-0.5'><Clock className='size-4 mr-2 text-primary' /> <span className='text-sm text-muted-foreground'>{data.duration} Minutes</span> </p>
                        <p className='flex items-center mt-0.5'><VideoIcon className='size-4 mr-2 text-primary' /> <span className='text-sm text-muted-foreground'>{data.videoSoftware} </span> </p>
                    </div>
                {/* <Separator orientation='right' className='h-full w-1' /> */}
                </div>
                <div className='flex-[0.6]'>
                    {/* <Calendar/> */}
                    <RenderCalender availability={data.user?.availability as any}/>
                </div>
            </CardContent>

        </Card>

    </div>
  )
}

export default BookingFormRoute