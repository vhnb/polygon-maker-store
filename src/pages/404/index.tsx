import styles from './styles.module.css'
import { FaArrowLeft } from 'react-icons/fa'

export default function notFound(){
    return(
        <main className={styles.container}>
            <h1>404</h1>
            <p>This page not found</p>
            <a href='/'><FaArrowLeft/> Back to website</a>
        </main>
    )
}