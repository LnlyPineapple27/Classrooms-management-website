import { createContext, useState } from "react";

const NewClassroomAddedContext = createContext([{}, () => {}])

const NewClassroomAddedProvider = ({ children }) => {
    const [add, setAdd] = useState(null)

    return (
        <NewClassroomAddedContext.Provider value={[add, setAdd]}>
            {children}
        </NewClassroomAddedContext.Provider>
    )
}

export {NewClassroomAddedContext, NewClassroomAddedProvider}