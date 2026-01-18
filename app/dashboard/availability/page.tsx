import { updateAvailabilityAction } from '@/app/actions/action'
import { SubmitButton } from '@/app/components/SubmitButtons'
import { requireUser } from '@/app/lib/hooks'
import { times } from '@/app/lib/times'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
const getData = async(userId:string)=>{
  const data = await prisma.availability.findMany({
    where:{
      userId
    }
  })
  if(!data){
    return notFound()
  }
  return data;
}

const AvailabilityRoute = async() => {
  const session = await requireUser();
    const data = await getData(session.user?.id as string)
  return (
    <div>
        <Card className='w-full '>
            <CardHeader className='w-full'>
                <CardTitle>Availability</CardTitle>
                <CardDescription> in this section you can manage your availability</CardDescription>
            </CardHeader>

           <form action={updateAvailabilityAction}>

                 <CardContent className='flex flex-col gap-y-4'>
                    {
                      data.map(availability=>(
                        <div key={availability.id} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4'>
                            <input type='hidden'
                            value={availability.id}
                             name={`id-${availability.id}`} />
                            <div className='flex items-center gap-x-3'>
                                <Switch name={`isActive-${availability.id}`} defaultChecked={availability.isActive}/>
                                <p>{availability.day}</p>
                            </div>
                            <Select name={`fromTime-${availability.id}`} defaultValue={availability.fromTime}>
                              <SelectTrigger className='w-full'>
                                <SelectValue placeholder='From Time' />

                              </SelectTrigger>
                              <SelectContent>
                                  <SelectGroup>
                                      {
                                        times.map(time=>(
                                          <SelectItem value={time.time} key={time.id}>
                                                {time.time}
                                          </SelectItem>
                                        ))
                                      }
                                  </SelectGroup>
                              </SelectContent>

                            </Select>
                            <Select name={`tillTime-${availability.id}`}  defaultValue={availability.tillTime}>
                              <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Till Time' />

                              </SelectTrigger>
                              <SelectContent>
                                  <SelectGroup>
                                      {
                                        times.map(time=>(
                                          <SelectItem value={time.time} key={time.id}>
                                                {time.time}
                                          </SelectItem>
                                        ))
                                      }
                                  </SelectGroup>
                              </SelectContent>
                            </Select>
                        </div>
                      ))
                    }
                </CardContent>
           <CardFooter>
            <SubmitButton text='Save Changes' className="w-auto mt-2 bg-primary p-5" />
           </CardFooter>
           </form>
          </Card>
    </div>
  )
}

export default AvailabilityRoute