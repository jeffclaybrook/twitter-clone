import { useCallback, useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"
import Input from "../Input"
import Modal from "../Modal"

const LoginModal = () => {
 const loginModal = useLoginModal()
 const registerModal = useRegisterModal()
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [isLoading, setIsLoading] = useState(false)

 const onSubmit = useCallback(async () => {
  try {
   setIsLoading(true)

   await signIn("credentials", {
    email,
    password
   })

   toast.success("Logged in")
   loginModal.onClose()
  } catch (error) {
   toast.error("Something went wrong")
  } finally {
   setIsLoading(false)
  }
 }, [
  email,
  password,
  loginModal
 ])

 const onToggle = useCallback(() => {
  loginModal.onClose()
  registerModal.onOpen()
 }, [
  loginModal,
  registerModal
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
   <p>First time using Twitter?
    <span
     onClick={onToggle}
     className="text-white cursor-pointer ml-2 hover:underline"
    >
     Create an account
    </span>
   </p>
  </div>
 )

 return (
  <Modal
   disabled={isLoading}
   isOpen={loginModal.isOpen}
   title="Login"
   actionLabel="Sign in"
   onClose={loginModal.onClose}
   onSubmit={onSubmit}
   body={bodyContent}
   footer={footerContent}
  />
 )
}

export default LoginModal