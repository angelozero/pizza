import logoImg1 from '../../../public/50-white-big-shell-logo.png'
import styles from '../../../styles/home.module.scss'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

export default function SingUp() {
  return (
    <>
      <Head>
        <title>BigShell Pizza - Singup</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg1} alt={"Logo BigShell Pizza"} />

        <div className={styles.login}>
            <h1>Who are you?</h1>
          <form>
            <Input placeholder='Name' type='text' />
            <Input placeholder='Email' type='password' />
            <Input placeholder='Password' type='password' />
            <Button type='submit' loading={false}> Save</Button>
          </form>

          <Link href="/" legacyBehavior>
            <a className={styles.text}>Already have an account? Login</a>
          </Link>

        </div>

      </div>
    </>
  )
}
