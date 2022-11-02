import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss'
import { FiUpload } from "react-icons/fi";


type ItemProps = {
    id: string,
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps) {


    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [photo, setPhoto] = useState(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();

        try {
            if (!name || !price || !photo || !categories || categories.length <= 0) {
                toast.warn('Need more information to save a Product!')
                return;
            }

            const data = new FormData();

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('banner', photo);
            data.append('categoryId', categories[categorySelected].id);

            await apiClient.post('/product', data)
                .then(response => {
                    toast.success(`Product ${name} saved with success!`)
                    console.log(response)
                    setName('');
                    setPrice('');
                    setDescription('');
                    setImageUrl('');
                    setPhoto(null);
                })

        } catch (error) {
            toast.error('Ops! Something went wrong');
        }

    }

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files || !event.target.files[0]) {
            toast.warn('Picture was not sent')
            return;
        }

        const image = event.target.files[0];

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setPhoto(image);
            setImageUrl(URL.createObjectURL(image))
        }

    }

    function handleChangeCategory(event) {
        setCategorySelected(event.target.value)
    }

    return (
        <>
            <Head>
                <title>New Product - BigShell Pizza</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>

                    <h1>New Product</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        {/* Photo field */}
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color='#FFF' />
                            </span>
                            <input type='file' accept="image/png, image/jpeg" onChange={handleFile} />

                            {imageUrl && (
                                <img className={styles.preview} src={imageUrl} alt="Product picture" width={250} height={250} />
                            )}

                        </label>


                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((category, index) => {
                                return (
                                    <option key={category.id} value={index}>
                                        {category.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input type='text' placeholder='name' className={styles.input} value={name} onChange={e => setName(e.target.value)} />
                        <input type='text' placeholder='price' className={styles.input} value={price} onChange={e => setPrice(e.target.value)} />
                        <textarea placeholder='description' className={styles.input} value={description} onChange={e => setDescription(e.target.value)} />
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
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category');

    return {
        props: { categoryList: response.data.data }
    }
})