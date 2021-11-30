import { createContext, useState } from "react";

const ImportFileContext = createContext([{}, () => {}])

const ImportFileProvider = ({ children }) => {
    const [importStatus, setImportStatus] = useState(null)

    return (
        <ImportFileContext.Provider value={[importStatus, setImportStatus]}>
            {children}
        </ImportFileContext.Provider>
    )
}

export {ImportFileContext, ImportFileProvider}