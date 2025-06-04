import React from 'react'
import NoInvites from './_components/NoInvite'

function page() {
  return (
    <div>
      <header className="flex   items-center justify-center font-semibold border-b border-[#ece9eb] py-4">
        <h1 className="text-2xl italic tracking-wide uppercase">Your Invites</h1>
      </header>
      <div className=''>
         <NoInvites/>
      </div>
       
    </div>
  )
}

export default page
