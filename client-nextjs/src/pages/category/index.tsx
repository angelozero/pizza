import { FormEvent, useState } from 'react';
import styles from './styles.module.scss'
import Head from "next/head";
import { Header } from "../../components/Header";
import { setupAPIClient } from '../../services/api';
import { api } from '../../services/apiClient';
import { toast } from 'react-toastify';
import { canSSAuth } from '../../utils/canSSRAuth';

export default function Category() {

    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (!name) {
            toast.warn('Need a name for Category')
            return;
        }
        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        }).then(response => {
            toast.success(`Category ${name} saved with success!`)
            console.log(response)
            setName('');
        })

    }

    return (
        <>
            <Head>
                <title>New Category - BigShell Pizza</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>

                    <h1>New Category</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input type='text' placeholder='name' className={styles.input} value={name} onChange={e => setName(e.target.value)} />
                        <button type='submit' className={styles.buttonAdd}>
                            Save
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSAuth(async (ctx) => {
    return {
        props: {}
    }
})