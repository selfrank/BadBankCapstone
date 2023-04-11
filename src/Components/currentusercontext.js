import React from "react"

export const CurrentUserContext = React.createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null)

  const fetchCurrentUser = async () => {
    let response = await fetch("http://localhost:3001/account/login/${email}/${password}")
    response = await response.json()
    setCurrentUser(response)
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext)