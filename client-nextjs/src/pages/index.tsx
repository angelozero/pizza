import { FormEvent, useContext, useState } from 'react'

import logoImg1 from '../../public/50-white-big-shell-logo.png'
import styles from '../../styles/home.module.scss'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {

  const { singIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();


    await singIn({
      email,
      password
    });
  }


  return (
    <>
      <Head>
        <title>BigShell Pizza - Login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg1} alt={"Logo BigShell Pizza"} />

        <div className={styles.login}>

          <form onSubmit={handleLogin}>

            <Input placeholder='Email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type='submit' loading={loading}> Login</Button>

          </form>

          <Link href="/singup" legacyBehavior>
            <a className={styles.text}>Don't have an account? Register</a>
          </Link>

        </div>
      </div>
    </>
  )
}
