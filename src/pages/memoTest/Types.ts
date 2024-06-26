export interface MemoTestContextProps {
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    runTime: boolean,
    setRunTime: React.Dispatch<React.SetStateAction<boolean>>,
    memoComplete: boolean,
    setMemoComplete: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface MemoBlockType {
    index: number,
    emoji: string, 
    flipped: boolean, 
    success: boolean,
}

export interface BoardProps {
    handleMemoClick: (arg0: MemoBlockType) => void,
    animating: boolean, 
    memoBlocks: MemoBlockType[]
}

export interface MemoBlockProps {
    handleMemoClick: (arg0: MemoBlockType) => void,
    animating: boolean, 
    memoBlock: MemoBlockType
}