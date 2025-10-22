import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Application from '@consuri/reservation-client'

const App = () => (
    <div>
        <BrowserRouter basename={''}>
            <Application/>
        </BrowserRouter>
    </div>
)

export default App
