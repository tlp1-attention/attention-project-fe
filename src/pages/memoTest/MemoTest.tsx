import Board from './components/Board/Board';
import ScoreTable from './components/ScoreTable/ScoreTable';
import { useMemoTest } from './hook/useMemoTest';

const MemoTest = () => {

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
                        <Board memoBlocks={shuffledMemoBlocks} animating={animating}  handleMemoClick={handleMemoClick} />
                    </div>
                    <div className="col-3">
                        <ScoreTable />
                    </div>
                </div>
            </div>
    );
}

export default MemoTest