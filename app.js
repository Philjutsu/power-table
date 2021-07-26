import React from 'react';
import style from './scss/main.scss'

import ExampleTable from './components/table-hoc'

const App = () => {
    return (
        <main className={style.main}>
            <div className={style.presentationContainer}>
                <ExampleTable />
            </div>
        </main>
    )
}

export default App;