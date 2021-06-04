import {FaGithub} from 'react-icons/fa'
import styles from './styles.module.scss'
export function SignInButton() {
    return (
        <button 
        className={styles.signInButton}
        type="button">
            <FaGithub/>
            Sign in with Github
        </button>
    )
}