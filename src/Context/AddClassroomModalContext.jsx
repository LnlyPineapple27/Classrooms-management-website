import { createContext, useState } from "react";

const AddClassroomModalContext = createContext([{}, () => {}])

const AddClassroomModalProvider = ({ children }) => {
    const [open, setOpen] = useState(false)

    return (
        <AddClassroomModalContext.Provider value={[open, setOpen]}>
            {children}
        </AddClassroomModalContext.Provider>
    )
}

export { AddClassroomModalContext, AddClassroomModalProvider }