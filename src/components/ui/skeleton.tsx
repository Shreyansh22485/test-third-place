import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

// Card skeleton for events
function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <Skeleton className="h-48 w-full rounded-lg mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-3" />
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}

// Apple card skeleton for invites carousel
function AppleCardSkeleton() {
  return (
    <div className="relative h-96 w-80 rounded-3xl bg-white shadow-lg overflow-hidden">
      <Skeleton className="h-60 w-full" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  )
}

// Profile row skeleton
function ProfileRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-6 rounded-full" />
        <div>
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-4 w-4" />
    </div>
  )
}

// Header skeleton
function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
  )
}

// Event details skeleton
function EventDetailsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-md px-5 pb-28 pt-4 md:max-w-lg md:px-0">
      <HeaderSkeleton />
      
      {/* Cover photo */}
      <Skeleton className="h-[391px] w-full rounded-2xl mt-4 mb-3" />
      
      {/* Event title */}
      <Skeleton className="h-6 w-3/4 mx-auto mb-3" />
      
      {/* Time + Location */}
      <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      
      {/* Itinerary */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
        <Skeleton className="h-6 w-24 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Bring a Friend */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex justify-between items-center mb-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24 rounded-2xl" />
        </div>
        <div className="bg-yellow-50 rounded-2xl p-4">
          <div className="flex gap-3">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Summary */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <hr className="my-3" />
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Booking success skeleton
function BookingSuccessSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>
        
        <div className="border-t pt-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
        
        <Skeleton className="h-12 w-full rounded-lg mt-6" />
      </div>
    </div>
  )
}

// Dashboard home skeleton
function DashboardSkeleton() {
  return (
    <div className="max-w-6xl px-4 min-h-screen">
      {/* Mobile header skeleton */}
      <div className="md:hidden mb-4">
        <HeaderSkeleton />
      </div>
      
      {/* Take test skeleton */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
      
      {/* Events grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

// Invites skeleton
function InvitesSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 pt-4">
      <HeaderSkeleton />
      
      {/* Mobile carousel skeleton */}
      <div className="md:hidden mt-6">
        <div className="flex gap-4 overflow-hidden">
          <div className="w-[92vw] max-w-[340px]">
            <AppleCardSkeleton />
          </div>
        </div>
        <div className="mt-4 px-4">
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </div>
      
      {/* Desktop carousel skeleton */}
      <div className="hidden md:block mt-12">
        <div className="flex gap-6 justify-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <AppleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Profile skeleton
function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <HeaderSkeleton />
      
      {/* User info skeleton */}
      <div className="px-4 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div>
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
      
      {/* Profile rows skeleton */}
      <div className="bg-white">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProfileRowSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

// Policy page skeleton
function PolicySkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSkeleton />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page title skeleton */}
        <Skeleton className="h-8 w-64 mb-6" />
        
        {/* Content blocks skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Personality test skeleton
function PersonalityTestSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <HeaderSkeleton />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page title skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-8 w-64" />
        </div>
        
        {/* Form container skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-6" />
          
          {/* Form fields skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            ))}
          </div>
          
          <Skeleton className="h-12 w-32 mt-6 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export { 
  Skeleton, 
  CardSkeleton, 
  AppleCardSkeleton, 
  ProfileRowSkeleton, 
  HeaderSkeleton,
  EventDetailsSkeleton,
  BookingSuccessSkeleton,
  DashboardSkeleton,
  InvitesSkeleton,
  ProfileSkeleton,
  PolicySkeleton,
  PersonalityTestSkeleton
}
