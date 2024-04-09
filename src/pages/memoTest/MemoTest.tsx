import Board from './components/Board/Board';
import ScoreTable from './components/ScoreTable/ScoreTable';
import { useParams } from 'react-router-dom';
import { useMemoTest } from './hook/useMemoTest';
import { useMemoTestContext } from './context/MemoTestContext';

const MemoTest = () => {

    const { level } = useParams()

    if (!level) {
        throw new Error("El nivel no está definido");
    }

    const memoTestContext = useMemoTestContext();

    if (!memoTestContext) {
        throw new Error("El contexto es nulo. Asegúrate de estar utilizando useMemoTestContext dentro de un MemoTestContextProvider")
    }

    const { setLevel } = memoTestContext
    setLevel(parseInt(level))

    const {
        shuffledMemoBlocks,
        animating,
        handleMemoClick,
    } = useMemoTest('❤🌹🎶🎂🎈🕶💎🏈🍕🍔')

    return (
            <div 
                className="container w-100"
            >
                <div className='row'>
                    <div className="col"></div>
                    <div className="col-6">
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