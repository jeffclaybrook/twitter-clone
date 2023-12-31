import { useCallback } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import useUser from "@/hooks/useUser"

interface AvatarProps {
 userId: string;
 isLarge?: boolean;
 hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
 userId,
 isLarge,
 hasBorder
}) => {
 const router = useRouter()
 const { data: fetchedUser } = useUser(userId)

 const onClick = useCallback((event: any) => {
  event.preventDefault()
  const url = `/users/${userId}`
  router.push(url)
 }, [router, userId])

 return (
  <div
   className={`
    ${hasBorder ? "border-4 border-black" : ""}
    ${isLarge ? "h-32" : "h-12"}
    ${isLarge ? "w-32" : "w-12"}
    rounded-full
    hover:opacity-90
    transition
    cursor-pointer
    relative
   `}
  >
   <Image
    src={fetchedUser?.profileImage || "/images/placeholder.png"}
    alt="Avatar"
    onClick={onClick}
    fill
    sizes="48px"
    style={{
     objectFit: "cover",
     borderRadius: "100%"
    }}
   />
  </div>
 )
}

export default Avatar