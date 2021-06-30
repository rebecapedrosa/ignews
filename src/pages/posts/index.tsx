import Head from 'next/head';
import styles from './styles.module.scss';

export default function React() {
    return (
        <>
            <Head>
                <title>Posts | Ignews </title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong>Banana macaco banana macaco banana macaco</strong>
                        <p>Bnanana nmananamanananananana</p>
                    </a>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong>Banana macaco banana macaco banana macaco</strong>
                        <p>Bnanana nmananamanananananana</p>
                    </a>
                </div>
            </main>
        </>
    )
}