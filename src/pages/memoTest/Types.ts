export interface MemoTestContextProps {
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    runTime: boolean,
    setRunTime: React.Dispatch<React.SetStateAction<boolean>>,
    memoComplete: boolean,
    setMemoComplete: React.Dispatch<React.SetStateAction<boolean>>,
    level: number,
    setLevel: React.Dispatch<React.SetStateAction<number>>,
    emojis: string,
    setEmojis: React.Dispatch<React.SetStateAction<string>>
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
    memoBlocks: MemoBlockType[],
    level: number
}

export interface MemoBlockProps {
    handleMemoClick: (arg0: MemoBlockType) => void,
    animating: boolean, 
    memoBlock: MemoBlockType
}