import React from 'react';
import styles from './css/Forca.module.css'

function Teclado() {
    const keys = {
        "linha 1": ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        "linha 2": ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        "linha 3": ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    };

    return (
        <>
            {Object.keys(keys).map((linha) => (
                <div key={linha} className={styles.row}>
                    {keys[linha].map((key) => (
                        <button
                            key={key}
                            type="button"
                            id={`key-${key.toUpperCase()}`}
                            className={styles.btn}
                        >
                            {key.toUpperCase()}
                        </button>
                    ))}
                </div>
            ))}
        </>
    )
}

export default Teclado