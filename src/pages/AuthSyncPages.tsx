/**
 * Node Modules 
 */
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useAuth } from "@clerk/clerk-react"


const AuthSyncPages = () => {
    const navigate = useNavigate()
    const {isSignedIn, isLoaded,userId} = useAuth()

    useEffect(() => {
        if (!isLoaded) return;

        //

        if(!isSignedIn) {
          // Handle this case sign out
          if (localStorage.getItem('clerkUserId')) {
            localStorage.removeItem('clerkUserId')
          }

            navigate('/')
            return;
        }

        if (isSignedIn) {
            localStorage.setItem('clerkUserId',userId)
            navigate('/app/today')
        }
    }, [userId,isSignedIn,isLoaded])


  return (
    <>
    
    </>
  )
}

export default AuthSyncPages