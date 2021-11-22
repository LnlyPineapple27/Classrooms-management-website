import { React } from 'react'
import './index.scss'

export default function ErrorPage({ status }) {
    return (
        <div className="container">
            <h1 className="error-status">{status}</h1>
            <p className="error-message">{`An error occurred ${status}`}</p>
        </div>
    )
}
