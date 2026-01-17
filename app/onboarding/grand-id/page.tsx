import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import videoGif from '@/public/work-is-almost-over-happy.gif'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CalendarCheck2 } from 'lucide-react'

const OnboardingRouteTwo = () => {
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
        <Card className='w-full max-w-md'>
            <CardHeader className='w-full'>
                <CardTitle>You are almost done!</CardTitle>
                <CardDescription> We have to now connect your calendar to your account</CardDescription>
              <Image src={videoGif} alt='Almost done!'  className='w-full rounded-lg'/>
            </CardHeader>
            <CardContent>
              <Button asChild className='w-full'>
                <Link href='/'>
                <CalendarCheck2 className='size-4 mr-2'/>
                Connect Calendar to your account</Link>
              </Button>
            </CardContent>
          </Card>
    </div>
  )
}

export default OnboardingRouteTwo