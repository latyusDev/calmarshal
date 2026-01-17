import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'
import Logo from '@/public/logo.png' 
import { GithubAuthButton, GoogleAuthButton } from './SubmitButtons'
import { signIn } from '../lib/auth'

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for free</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='flex gap-2 flex-row justify-center items-center'>
          <Image src={Logo} alt='Logo' className='size-10' />
          <DialogTitle className='text-3xl font-semibold'>
            Cal<span className='text-blue-500'>Marshal</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className='flex flex-col gap-3 mt-5'>
          <form action={async()=>{
            "use server"
            await signIn('google')
          }} className='w-full'>
            <GoogleAuthButton/>
          </form>
          
          <form action={async()=>{
            "use server"
            await signIn('github')
          }} className='w-full'>
            <GithubAuthButton/>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal