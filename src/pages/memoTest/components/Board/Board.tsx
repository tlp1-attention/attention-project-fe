import MemoBlock from '../MemoBlock/MemoBlock'
import { BoardProps, MemoBlockType } from '@pages/memoTest/Types'
import style from "./Board.module.css"

const Board = ({ handleMemoClick, animating, memoBlocks, level }: BoardProps) => {
    return (
        <main className={style.board}>
            {
                memoBlocks.map((memoBlock: MemoBlockType, i: number) => (
                    <MemoBlock key={i} memoBlock={memoBlock} handleMemoClick={handleMemoClick} animating={animating} />
                ))
            }
        </main>
    )
}

export default Board