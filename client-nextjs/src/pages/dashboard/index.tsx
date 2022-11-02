import { canSSAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Header } from "../../components/Header"


export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Painel - BigShell Pizza</title>
            </Head>
            <div>
                <Header />
                <h1>Panel</h1>
            </div>
        </>
    )
}

export const getServerSideProps = canSSAuth(async (context) => {
    return {
        props: {}
    }
})