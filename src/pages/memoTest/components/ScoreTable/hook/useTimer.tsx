import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMemoTestContext } from '../../../context/MemoTestContext'
import { Alert } from '@features/ui/alert/Alert'

export const useTimer = (initialTime: number) => {

    const [ timer, setTimer ] = useState<number>(initialTime)

    const navigate = useNavigate()

    const memoTestContext = useMemoTestContext()

    if (!memoTestContext) {
        throw new Error("El contexto es nulo. Asegúrate de estar utilizando useMemoTestContext dentro de un MemoTestContextProvider")
    }

    const {
        runTime,
        setRunTime,
        level,
        setEmojis
    } = memoTestContext

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (runTime === false && timer === 0) {
            setTimeout(() => {
                Alert.fire("Se ha terminado el tiempo!");
                setTimeout(() => 
                    window.location.reload()
                , 1000);
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
            }, 1000 - (level * 50));
        }
        if (timer === 0) {
            setRunTime(false)
        }

        return () => clearInterval(interval)
    }, [runTime, setRunTime, timer]);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        setTimer(initialTime)
        setRunTime(true)

        const newEmojis: string = 
            (level + 1) < 3 ? '❤🌹🎶🎂🎈🕶💎🏈🍕🍔' : 
            (level + 1) < 5 ? '❤🌹🎶🎂🎈🕶💎🏈🍕🍔🍟🍒' : '❤🌹🎶🎂🎈🕶💎🏈🍕🍔🍟🍒🎃🚀🌎'
        setEmojis(_prevEmojis => newEmojis)

        navigate(`/workspace/memoTest/${level + 1}`)
    }

    return {
        timer,
        handleClick
    }
}