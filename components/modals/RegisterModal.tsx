import { useCallback, useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import axios from "axios"
import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"
import Input from "../Input"
import Modal from "../Modal"

const RegisterModal = () => {
 const loginModal = useLoginModal()
 const registerModal = useRegisterModal()
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [name, setName] = useState("")
 const [username, setUsername] = useState("")
 const [isLoading, setIsLoading] = useState(false)

 const onSubmit = useCallback(async () => {
  try {
   setIsLoading(true)

   await axios.post("/api/register", {
    email,
    password,
    name,
    username
   })

   setIsLoading(false)

   toast.success("Account created")
   
   signIn("credentials", {
    email,
    password
   })

   registerModal.onClose()
  } catch (error) {
   toast.error("Something went wrong")
  } finally {
   setIsLoading(false)
  }
 }, [
  email,
  password,
  name,
  username,
  registerModal
 ])

 const onToggle = useCallback(() => {
  if (isLoading) {
   return
  }
  
  registerModal.onClose()
  loginModal.onOpen()
 }, [
  loginModal,
  registerModal,
  isLoading
 ])

 const bodyContent = (
  <div className="flex flex-col gap-4">
   <Input
    placeholder="Email"
    value={email}
    disabled={isLoading}
    onChange={(e) => setEmail(e.target.value)}
   />
   <Input
    placeholder="Name"
    value={name}
    disabled={isLoading}
    onChange={(e) => setName(e.target.value)}
   />
   <Input
    placeholder="Username"
    value={username}
    disabled={isLoading}
    onChange={(e) => setUsername(e.target.value)}
   />
   <Input
    type="password"
    placeholder="Password"
    value={password}
    disabled={isLoading}
    onChange={(e) => setPassword(e.target.value)}
   />
  </div>
 )

 const footerContent = (
  <div className="text-neutral-400 text-center mt-4">
   <p>Already have an account?
    <span
     onClick={onToggle}
     className="text-white cursor-pointer ml-2 hover:underline"
    >
     Sign in
    </span>
   </p>
  </div>
 )

 return (
  <Modal
   disabled={isLoading}
   isOpen={registerModal.isOpen}
   title="Create an account"
   actionLabel="Register"
   onClose={registerModal.onClose}
   onSubmit={onSubmit}
   body={bodyContent}
   footer={footerContent}
  />
 )
}

export default RegisterModal