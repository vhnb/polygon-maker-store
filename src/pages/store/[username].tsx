import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { collection, onSnapshot, query, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import styles from './styles.module.css'
import Head from 'next/head'
import { FaShoppingCart } from "react-icons/fa"
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5"

interface ProdutosProps {
    id: string,
    created: Date,
    produto: string,
    descProduto: string,
    precoProduto: string,
    urlImageProduto: string,
    user: string,
    userName: string,
}

interface PaymentsProps {
    id: string,
    user: string,
    payment: string,
    userName: string,
    created: Date
}

interface DescsProps{
    id: string,
    user: string,
    description: string,
    userName: string,
    created: Date
}

interface BannerProps{
    id: string,
    user: string,
    banner: string,
    userName: string,
    created: Date
}

export default function StoreUser() {
    const [storeProfile, setStoreProfile] = useState<ProdutosProps[]>([])
    const [storePayment, setStorePayment] = useState<PaymentsProps[]>([])
    const [storeDesc, setStoreDesc] = useState<DescsProps[]>([])
    const [storeBanner, setStoreBanner] = useState<BannerProps[]>([])
    const [copied, setCopied] = useState(false)
    const [copied2, setCopied2] = useState(false)
    const router = useRouter()
    const { username } = router.query

    useEffect(() => {
        async function LoadItens() {
            if (!username) return

            const q = query(collection(db, 'produtos'), where("userName", "==", username as string))
            onSnapshot(q, (snapshot) => {
                let lista = [] as ProdutosProps[]

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        produto: doc.data().produto,
                        descProduto: doc.data().descProduto,
                        precoProduto: doc.data().precoProduto,
                        urlImageProduto: doc.data().urlImageProduto,
                        created: doc.data().created,
                        user: doc.data().user,
                        userName: doc.data().userName
                    })
                })
                setStoreProfile(lista)
            })
        }
        LoadItens()
    }, [username])

    useEffect(() => {
        async function LoadPayments() {
            if (!username) return

            const qPay = query(collection(db, 'payments'), where("userName", "==", username as string))
            onSnapshot(qPay, (snapshot) => {
                let listaPayments = [] as PaymentsProps[]

                snapshot.forEach((doc) => {
                    listaPayments.push({
                        id: doc.id,
                        user: doc.data().user,
                        payment: doc.data().payment,
                        userName: doc.data().userName,
                        created: doc.data().created
                    })
                })
                setStorePayment(listaPayments)
            })
        }
        LoadPayments()
    }, [username])

    useEffect(() => {
        async function LoadDescs() {
            if (!username) return

            const qDesc = query(collection(db, 'descriptions'), where("userName", "==", username as string))
            onSnapshot(qDesc, (snapshot) => {
                let listaBanners = [] as DescsProps[]

                snapshot.forEach((doc) => {
                    listaBanners.push({
                        id: doc.id,
                        user: doc.data().user,
                        description: doc.data().description,
                        userName: doc.data().userName,
                        created: doc.data().created
                    })
                })
                setStoreDesc(listaBanners)
            })
        }
        LoadDescs()
    }, [username])

    /////////
    useEffect(() => {
        async function LoadBanner() {
            if (!username) return

            const qDesc = query(collection(db, 'banners'), where("userName", "==", username as string))
            onSnapshot(qDesc, (snapshot) => {
                let listaBanners = [] as BannerProps[]

                snapshot.forEach((doc) => {
                    listaBanners.push({
                        id: doc.id,
                        user: doc.data().user,
                        banner: doc.data().banner,
                        userName: doc.data().userName,
                        created: doc.data().created
                    })
                })
                setStoreBanner(listaBanners)
            })
        }
        LoadBanner()
    }, [username])

    async function handleCopyPayment() {
        const paymentText = storePayment.map(item => item.payment).join('') || 'No payment method found...'
        await navigator.clipboard.writeText(paymentText)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    async function handleCopyPayment2() {
        const paymentText = storePayment.map(item => item.payment).join('') || 'No payment method found...'
        await navigator.clipboard.writeText(paymentText)
        setCopied2(true)
        setTimeout(() => {
            setCopied2(false)
        }, 3000)
    }

    function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
        event.currentTarget.src = 'https://i.ibb.co/K9F25WX/No-data-rafiki.png'
    }

    function handleBannerError(event: React.SyntheticEvent<HTMLImageElement, Event>){
        event.currentTarget.src = 'https://i.ibb.co/59w7S8d/Captura-de-tela-2024-06-01-143737.png'
    }

    return (
        <main className={styles.container}>
            <Head>
                <title>Polygon | {username}</title>
            </Head>
            <div className={styles.containerAllUserStore}>
            <img onError={handleBannerError} className={styles.imgBannerStore} src={storeBanner.length > 0 ? `${storeBanner.map(banner => banner.banner).join('')}` : 'https://i.ibb.co/59w7S8d/Captura-de-tela-2024-06-01-143737.png'} alt='Image banner user'/>
                <h1>{username}'s store {username === 'vitinhoo' && (<span>Owner</span>)}</h1>
                {storeDesc.length === 0 && (
                    <p>This store has no description</p>
                )}
                {storeDesc.map((item) => (
                    <p  key={item.id}>{item.description}</p>
                ))}
                <span onClick={handleCopyPayment}>
                    {storePayment.map((item) => (
                        <p key={item.id}>{item.payment}</p>
                    ))}
                    {storePayment.length === 0 && (
                        <p>No payment method</p>
                    )}
                    {copied ? (
                        <IoCheckmarkOutline size={20} style={{ marginLeft: '10px', marginRight: '10px' }} />
                    ) : (
                        <IoCopyOutline size={20} style={{ marginLeft: '10px', marginRight: '10px' }} />
                    )}</span>
                <h2>Products</h2>
                <div className={styles.containerProducts}>
                    {storeProfile.length === 0 && (
                        <p>This store has no products...</p>
                    )}
                    {storeProfile.map((item) => (
                        <article className={styles.cardProducts} key={item.id}>
                            <img onError={handleImageError} src={item.urlImageProduto} alt={item.produto} />
                            <h1>{item.produto}</h1>
                            <h2>{item.descProduto}</h2>
                            <div className={styles.containerInfoProduto}>
                                <div>
                                    <p className={styles.textIndicatorPrice}>Price:</p>
                                    <p className={styles.texrPrice}>${item.precoProduto}</p>
                                </div>
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal"><FaShoppingCart style={{ marginRight: '10px' }} /> Comprar</button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`${styles.containerEditModal} ${"modal-content"}`}>
                        <h1>Payment method</h1>
                        <span onClick={handleCopyPayment2}>
                            {storePayment.length === 0 && (
                                <p>No payment method</p>
                            )}
                            {storePayment.map((item) => (
                                <p key={item.id}>{item.payment}</p>
                            ))} {copied2 ? (
                                <IoCheckmarkOutline style={{ marginLeft: '10px', marginRight: '10px' }} />
                            ) : (
                                <IoCopyOutline style={{ marginLeft: '10px', marginRight: '10px' }} />
                            )}</span>
                        <button data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </main>
    )
}