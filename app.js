import React, { useEffect, useState } from 'react';
import style from './scss/main.scss'
import { mediaQueryList } from './media-context';
import PowerTable from './components/PowerTable'

const App = () => {
    const [mediaSize, setMediaSize] = useState('');
    const matchMedium = window.matchMedia(mediaQueryList.medium.value)

    const screenWidthChange = (media) => {
        if(media.matches) {
            setMediaSize('medium')
        } else {
            setMediaSize('small')
        }
    }

    useEffect(() => {
        screenWidthChange(matchMedium)
        matchMedium.addEventListener('change', screenWidthChange);
    }, [])

    return (
        <main className={style.main}>
            <div className={style.presentationContainer}>
                <PowerTable mediaSize={mediaSize} />
            </div>
        </main>
    )
}

export default App;