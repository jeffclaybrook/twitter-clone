import { useEffect } from "react"
import { BsTwitter } from "react-icons/bs"
import useNotifications from "@/hooks/useNotifications"
import useCurrentUser from "@/hooks/useCurrentUser"

const NotificationsFeed = () => {
 const {
  data: currentUser,
  mutate: mutateCurrentUser
 } = useCurrentUser()
 
 const {
  data: fetchedNotifcations = []
 } = useNotifications(currentUser?.id)

 useEffect(() => {
  mutateCurrentUser()
 }, [mutateCurrentUser])

 if (fetchedNotifcations.length === 0) {
  return (
   <div className="text-neutral-600 text-center p-6 text-xl">
    No notifications
   </div>
  )
 }

 return (
  <div>
   {fetchedNotifcations.map((notification: Record<string, any>) => (
    <div
     key={notification.id}
     className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
    >
     <BsTwitter color="white" size={32} />
     <p className="text-white">
      {notification.body}
     </p>
    </div>
   ))}
  </div>
 )
}

export default NotificationsFeed