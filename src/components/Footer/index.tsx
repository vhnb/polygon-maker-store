import styles from './styles.module.css'

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <p>Made with ❤️ by <a href='https://vhnb.vercel.app' target='blank'>vitinho</a></p>
        </footer>
    )
}