import { canSSAuth } from "../../utils/canSSRAuth"

export default function Dashboard() {
    return (
        <div>
            <h1>Bem vindo patotinha</h1>
        </div>
    )
}

export const getServerSideProps = canSSAuth(async (context) => {
    return {
        props: {}
    }
})