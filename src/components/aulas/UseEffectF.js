import { useEffect, useState } from "react"

function UseEffectF() {
    const [count, setCount] = useState(0)
    const [countB, setCountB] = useState(10)
    const [user, setUser] = useState()

    // 1 - useEffect
    useEffect(() => {
        console.log("Roda a cada renderização!");
    })

    // 2 - array de dependências
    useEffect(() => {
        console.log("Só roda ao incrementar valor!");
    }, [count])

    // 3 - array de dependências vazio
    useEffect(() => {
        console.log("Só executa uma vez!");
    }, [])

    // 4 - clean up funcion
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(`O incrementador foi alterado ${count} vezes`);

        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [count])

    // 5 fetch com useEffect
    useEffect(() => {
        fetch("https://api.github.com/users/ulysses-oliveira")
            .then((res) => res.json())
            .then((json) => setUser(json))
    }, [])

    return (
        <div>
            <div>
                <button onClick={() => setCount((prevCount) => prevCount + 1)}>
                    Renderizar
                </button>
                <p>{count}</p>
            </div>
            <div>
                <button onClick={() => setCountB((prevCount) => prevCount + 1)}>
                    Renderizar
                </button>
                <p>{countB}</p>
            </div>
        </div>
    );
}

export default UseEffectF