import Board from './components/Board/Board';
import ScoreTable from './components/ScoreTable/ScoreTable';
import { useParams } from 'react-router-dom';
import { useMemoTest } from './hook/useMemoTest';
import { useMemoTestContext } from './context/MemoTestContext';
import { useState, useEffect } from 'react';

const MemoTest = () => {

    const { level } = useParams()

    if (!level) {
        throw new Error("El nivel no está definido");
    }

    const [_update, setUpdate] = useState(false)

    useEffect(() => {
        setUpdate(_prevUpdate => !_prevUpdate)
    }, [level])

    const memoTestContext = useMemoTestContext();

    if (!memoTestContext) {
        throw new Error("El contexto es nulo. Asegúrate de estar utilizando useMemoTestContext dentro de un MemoTestContextProvider")
    }

    const { setLevel, emojis } = memoTestContext
    setLevel(parseInt(level))

    // const [emojis, setEmojis] = useState('')

    // useEffect(() => {
    //     const newEmojis: string = 
    //         parseInt(level) < 3 ? '❤🌹🎶🎂🎈🕶💎🏈🍕🍔' : 
    //         parseInt(level) < 5 ? '❤🌹🎶🎂🎈🕶💎🏈🍕🍔🍟🍒' : '❤🌹🎶🎂🎈🕶💎🏈🍕🍔🍟🍒🎃🚀🌎'
    //     setEmojis(_prevEmojis => newEmojis)
    // }, [level])

    const {
        shuffledMemoBlocks,
        animating,
        handleMemoClick,
    } = useMemoTest(emojis)

    console.log(shuffledMemoBlocks);

    return (
            <div 
                className="container w-100"
            >
                <div className='row'>
                    {/* <div className="col-2"></div> */}
                    <div className="col-9">
                        <Board memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} level={parseInt(level)}/>
                    </div>
                    <div className="col-3">
                        <ScoreTable level={parseInt(level)}/>
                    </div>
                </div>
            </div>
    );
}

export default MemoTest