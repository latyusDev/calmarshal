import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const AvailabilityRoute = () => {
  return (
    <div>
        <Card className='w-full max-w-md'>
            <CardHeader className='w-full'>
                <CardTitle>Availability</CardTitle>
                <CardDescription> in this section you can manage your availability</CardDescription>
            </CardHeader>

           <form>

                 <CardContent>
                    
                </CardContent>
           </form>
          </Card>
    </div>
  )
}

export default AvailabilityRoute