import { useState, useEffect } from 'react'
import { useMemoTestContext } from '../context/MemoTestContext';
import { MemoBlockType } from '../Types';

export const useMemoTest = (emojis: String) => {

    const emojiList = [...emojis]

    const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState<MemoBlockType[]>([]);
    const [selectedMemoBlock, setselectedMemoBlock] = useState<MemoBlockType | null>(null);
    const [animating, setAnimating] = useState(false);

    const memoTestContext = useMemoTestContext()

    if (!memoTestContext) {
        throw new Error('El contexto es nulo. Asegúrate de estar utilizando useMemoTestContext dentro de un MemoTestContextProvider');
    }

    const {
        setScore,
        setMemoComplete,
        setRunTime,
    } = memoTestContext

    useEffect( () => {
        //Le pasamos un array que posea 2 veces el mismo emoji y desordenamos el arrays
        const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
        //Guardamos con el formato de objeto el array desordenado
        setShuffledMemoBlocks(shuffledEmojiList.map( (emoji: String, i: number) => ({ index: i, emoji, flipped: true, success: false }) ));
        setTimeout(() => {
            setShuffledMemoBlocks(shuffledEmojiList.map( (emoji: String, i: number) => ({ index: i, emoji, flipped: false, success: false }) ));
        }, 1500)
    }, []);

    const shuffleArray = (a: String[]) => {
        //Recibe un array y desordena los elementos del mismo
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    const handleMemoClick = (memoBlock: MemoBlockType) => {
        const flippedMemoBlock = { ...memoBlock, flipped: true }
        let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        if (selectedMemoBlock === null) {
            setselectedMemoBlock(memoBlock);
        } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
            setTimeout(() => {
                shuffledMemoBlocksCopy.splice(memoBlock.index, 1, { ...memoBlock, flipped: true, success: true });
                shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, { ...selectedMemoBlock, flipped: true, success: true });
                setShuffledMemoBlocks(shuffledMemoBlocksCopy);
                setselectedMemoBlock(null);
                setScore((prev: number) => prev + 3)

                //evaluamos si terminaron todos los bloques y terminamos el juego
                const currentMemoComplete = shuffledMemoBlocksCopy.every(memoBlock => memoBlock.success === true)
                if (currentMemoComplete) {
                    setMemoComplete(currentMemoComplete)
                    setRunTime(false)
                    setTimeout(() => {
                        alert("Fin del juego")
                    }, 600)
                }
            }, 500);
        } else {
            setAnimating(true)
            setTimeout(() => {
                shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
                shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
                setShuffledMemoBlocks(shuffledMemoBlocksCopy);
                setselectedMemoBlock(null);
                setAnimating(false);
            }, 500);
        }
    }

    return {
        shuffledMemoBlocks,
        animating,
        handleMemoClick,
    }
}