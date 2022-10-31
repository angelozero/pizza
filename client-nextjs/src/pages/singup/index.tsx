import { FormEvent, useState, useContext } from 'react'

import logoImg1 from '../../../public/50-white-big-shell-logo.png'
import styles from '../../../styles/home.module.scss'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify';


import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

import { AuthContext } from '../../contexts/AuthContext'

export default function SingUp() {

  const { singUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSingUP(event: FormEvent) {
    event.preventDefault();

    if (!name || !email || !password) {
      toast.error('NAME, EMAIL, PASSWORD');
      return;
    }

    setLoading(true);
    singUp({ name, email, password });
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>BigShell Pizza - Singup</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg1} alt={"Logo BigShell Pizza"} />

        <div className={styles.login}>
          <h1>Who are you?</h1>
          <form onSubmit={handleSingUP}>
            <Input placeholder='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder='Email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type='submit' loading={loading}> Save</Button>
          </form>

          <Link href="/" legacyBehavior>
            <a className={styles.text}>Already have an account? Login</a>
          </Link>

        </div>

      </div>
    </>
  )
}
