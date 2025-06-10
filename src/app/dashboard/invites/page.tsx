import React from 'react'
import NoInvites from './_components/NoInvite'
import InvitesGallery from './_components/InvitesGallery'

function page() {
  return (
    <div>
      <header className="flex h-[58px]  items-center justify-center font-semibold border-b border-[#E5E5EA] py-4">
        <h1 className="text-2xl italic font-[500] tracking-wide uppercase">Your Invites</h1>
      </header>
      <div className=''>
         {/* <NoInvites/> */}
         <InvitesGallery/>
      </div>
       
    </div>
  )
}

export default page
