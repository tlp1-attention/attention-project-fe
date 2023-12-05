import { useState, useEffect } from 'react'
import { useMemoTestContext } from '../../../context/MemoTestContext'

export const useTimer = (initialTime: number) => {

    const [ timer, setTimer ] = useState<number>(initialTime)

    const memoTestContext = useMemoTestContext()

    if (!memoTestContext) {
        throw new Error("El contexto es nulo. Asegúrate de estar utilizando useMemoTestContext dentro de un MemoTestContextProvider")
    }

    const {
        runTime,
        setRunTime
    } = memoTestContext

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (runTime === false && timer === 0) {
            setTimeout(() => {
                alert("Se ha terminado el tiempo!")
                window.location.reload()
            }, 1000)
        }
        
        if (runTime) {
            interval = setInterval(() => {
                setTimer((prevSeconds) => {
                    if ((prevSeconds - 1) === 0) {
                        setRunTime(false)
                    }
                    return prevSeconds - 1
                })
            }, 1000)
        }
        if (timer === 0) {
            setRunTime(false)
        }

        return () => clearInterval(interval)
    }, [runTime])

    const handleClick = (e: any) => {
        e.preventDefault()
        setTimer(initialTime)
        setRunTime(true)
    }

    return {
        timer,
        handleClick
    }
}