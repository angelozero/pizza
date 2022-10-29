import logoImg from '../../public/50-white-big-shell-logo.png'
import styles from '../../styles/home.module.scss'

import Head from 'next/head'
import Image from 'next/image'

import { Input } from '../components/ui/input/input'

export default function Home() {
  return (
    <>
      <Head>
        <title>BigShell Pizza - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt={"Logo BigShell Pizza"} />
        <div className={styles.login}>
          <form>
          <Input placeholder='Email' type='text'/>
          <Input placeholder='Password' type='password'/>
          </form>
        </div>
      </div>
    </>
  )
}
