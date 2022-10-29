import logoImg1 from '../../public/50-white-big-shell-logo.png'
import styles from '../../styles/home.module.scss'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export default function Home() {
  return (
    <>
      <Head>
        <title>BigShell Pizza - Login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg1} alt={"Logo BigShell Pizza"} />

        <div className={styles.login}>
          <form>
            <Input placeholder='Email' type='text' />
            <Input placeholder='Password' type='password' />
            <Button type='submit' loading={false}> Login</Button>
          </form>

          <Link href="/singup" legacyBehavior>
            <a className={styles.text}>Don't have an account? Register</a>
          </Link>

        </div>

      </div>
    </>
  )
}
