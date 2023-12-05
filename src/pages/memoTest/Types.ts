export interface MemoTestContextProps {
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    runTime: Boolean,
    setRunTime: React.Dispatch<React.SetStateAction<Boolean>>,
    memoComplete: Boolean,
    setMemoComplete: React.Dispatch<React.SetStateAction<Boolean>>,
}

export interface MemoBlockType {
    index: number,
    emoji: String, 
    flipped: Boolean, 
    success: Boolean,
}

export interface BoardProps {
    handleMemoClick: (arg0: MemoBlockType) => void,
    animating: Boolean, 
    memoBlocks: MemoBlockType[]
}

export interface MemoBlockProps {
    handleMemoClick: (arg0: MemoBlockType) => void,
    animating: Boolean, 
    memoBlock: MemoBlockType
}