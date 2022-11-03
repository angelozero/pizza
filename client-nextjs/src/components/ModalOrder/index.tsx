import { FiX } from 'react-icons/fi';
import Modal from 'react-modal';
import { OrdemItemProps } from '../../pages/dashboard';
import styles from './styles.module.scss'

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    orderInfo: OrdemItemProps[];
    finishOrder: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, orderInfo, finishOrder }: ModalOrderProps) {

    const customStyles = {
        content: {
            top: '25%',
            bottom: 'auto',
            left: '35%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50% -50%)',
            backgroundColor: '#1d1d2e',
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>

            <button type='button' onClick={onRequestClose} className='react-modal-close' style={{ background: 'transparent', border: 0 }}>
                <FiX size={25} color={'#f34748'} />
            </button>
            {orderInfo.length > 0 && (
                <div className={styles.container}>
                    <h2>Order Detail</h2>
                    <span className={styles.table}>
                        Table: <strong>{orderInfo[0].order.table}</strong>
                    </span>

                    {
                        orderInfo.map(item =>
                            <section key={item.id} className={styles.containerItem}>
                                <span>{item.amount} - <strong>{item.product.name}</strong></span>
                                {/* <span className={styles.description}>&nbsp;&nbsp;- {item.product.description}</span> */}
                            </section>
                        )
                    }

                    <button className={styles.buttonOrder} onClick={(e: any) => finishOrder(orderInfo[0].id)}>
                        Confirm Order
                    </button>
                </div>
            )}
        </Modal>
    )
}