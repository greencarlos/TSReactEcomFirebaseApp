import {createContext} from 'react'
import type {User} from 'firebase/auth'

const UserContext = createContext<User | Null>(null)

export default UserContext
