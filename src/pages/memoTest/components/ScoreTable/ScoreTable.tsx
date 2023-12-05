import style from "./ScoreTable.module.css"
import { useTimer } from './hook/useTimer'
import { useMemoTestContext } from '../../context/MemoTestContext'

const ScoreTable = () => {

    const {
        timer,
        handleClick
    } = useTimer(45)

    const memoTestContext = useMemoTestContext()

    if (!memoTestContext) {
        throw new Error("El contexto es nulo. Asegúrate de estar utilizando useMemoTestContext dentro de un MemoTestContextProvider")
    }

    const {
        score,
        memoComplete
    } = memoTestContext

    return (
        <div className={style.scoreTable}>
            <div className={`${style.headerScoreTable} ${style.bgPurpleLight} text-white`} />
            <div className='d-flex h-100 w-100'>
                <div className={`d-flex flex-column align-items-center mt-3 ${style.scoreTableContent}`}>
                    <p>Tiempo: </p>
                    <p>{timer}</p>
                    <button className='btn btn-primary' onClick={handleClick}>Empezar</button>
                </div>
                <div className={`vr ${style.verticalLine}`}/>
                <div className={`d-flex flex-column align-items-center mt-3 ${style.scoreTableContent}`}>
                    <p>Puntaje: </p>
                    <p>{score}</p>
                    <button className={`btn btn-${memoComplete ? "primary" : "secondary"} ${style.btnTransition}`}>Continuar</button>
                </div>
            </div>
        </div>
    )
}

export default ScoreTable