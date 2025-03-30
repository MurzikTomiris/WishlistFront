import { useEffect, useState } from "react"
import { getLS } from "../utils/actionLocalStorage"
import { getUserFromLS } from "../BLL/accountSlice"
import { useDispatch } from "react-redux"

export const useCheckAuthUser = () => {
    const [isUser, setIsUser] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const isUser = getLS('user')
        

        if(isUser){
            dispatch(getUserFromLS(isUser))
            setIsUser(true)
        }
    }, [])

    return isUser
}