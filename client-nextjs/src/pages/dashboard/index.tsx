import styles from './styles.module.scss'
import { canSSAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Header } from "../../components/Header"
import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'
import { useEffect, useState } from 'react'

import Modal from 'react-modal'

import { ModalOrder } from '../../components/ModalOrder'
import { toast } from 'react-toastify'

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

type OrdemItemPropsProduct = {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

type OrdemItemPropsOrder = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

export type OrdemItemProps = {
    id: string;
    amount: string;
    order_id: string;
    order: OrdemItemPropsOrder;
    product_id: string;
    product: OrdemItemPropsProduct;
}


export default function Dashboard({ orders }: HomeProps) {


    const [orderList, setOrderList] = useState(orders || []);
    const [modalItem, setModalItem] = useState<OrdemItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
    }, [modalItem, orderList]);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string): Promise<void> {
        const apiClient = setupAPIClient();

        const responseInfo = await apiClient.get('/order/detail', {
            params: {
                id: id,
            }
        });

        setModalItem(() => ([...responseInfo.data.data]))
        setModalVisible(true)
    }

    async function handleFinishOrder(id: string) {
        const apiClient = setupAPIClient();

        await apiClient.put('/order/finish', {
            id: id
        })

        await handleRefresh();

        setModalVisible(false);
        toast.success('Order completed successfully')
    }

    async function handleRefresh() {
        const apiClient = setupAPIClient();
        const responseOrder = await apiClient.get('/orders', {
            params: {
                available: true
            }
        });
        setOrderList(responseOrder.data.data);
    }

    Modal.setAppElement('#__next')

    return (
        <>
            <Head>
                <title>Dashboard - BigShell Pizza</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>

                    <div className={styles.containerHeader}>
                        <h1>Last Orders</h1>
                        <button onClick={handleRefresh}>
                            <FiRefreshCcw size={25} color='#3fffa3' />
                        </button>
                    </div>

                    <article className={styles.listOrders}>

                        {orderList.length === 0 && (
                            <span className={styles.emptyList}>
                                There is no order to show...
                            </span>
                        )}

                        {
                            orderList.map((item, index) => {
                                return (
                                    <section className={styles.orderItem} key={item.id}>
                                        <button onClick={(e: any) => handleOpenModalView(item.id)}>
                                            <div className={styles.tag}></div>
                                            <span>Table {item.table} - {item.name}</span>
                                        </button>
                                    </section>
                                )
                            })
                        }

                    </article>

                </main>

                {
                    modalVisible && (
                        <ModalOrder isOpen={modalVisible} onRequestClose={handleCloseModal} orderInfo={modalItem} finishOrder={handleFinishOrder} />
                    )
                }
            </div>
        </>
    )
}

export const getServerSideProps = canSSAuth(async (context) => {

    const apiClient = setupAPIClient(context);

    const response = await apiClient.get('/orders', {
        params: {
            available: true
        }
    });

    const orders: OrdemItemProps[] = response.data.data;
    return {
        props: {
            orders: orders
        }
    }
})