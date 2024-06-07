import styles from './styles.module.css'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { db } from '../../services/firebaseConnection'
import { GetServerSideProps } from 'next'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { addDoc, collection, deleteDoc, onSnapshot, query, where, doc, updateDoc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import Head from 'next/head'
import { IoAddOutline } from "react-icons/io5"
import { FaTrash, FaEdit } from "react-icons/fa"
import { FaCheck } from "react-icons/fa6"

interface HomeProps {
    user: {
        email: string
    }
}

interface ProdutosProps {
    id: string,
    created: Date,
    produto: string,
    descProduto: string,
    precoProduto: string,
    urlImageProduto: string,
    user: string,
    userName: string
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

export default function MyStore({ user }: HomeProps) {
    const { data: session, status } = useSession()
    const [inputProdutos, setInputProdutos] = useState("")
    const [inputDesc, setInputDesc] = useState("")
    const [inputPreco, setInputPreco] = useState("")
    const [inputImg, setInputImg] = useState("")
    const [inputEditProdutos, setInputEditProdutos] = useState("")
    const [inputEditDesc, setInputEditDesc] = useState("")
    const [inputEditPreco, setInputEditPreco] = useState("")
    const [inputEditImg, setInputEditImg] = useState("")
    const [inputPaymentMethod, setInputPaymentMethod] = useState("")
    const [storePayment, setStorePayment] = useState<PaymentsProps[]>([])
    const [inputStoreDesc, setInputStoreDesc] = useState("")
    const [storeDesc, setStoreDesc] = useState<DescsProps[]>([])
    const [editProductId, setEditProductId] = useState<string | null>(null)
    const [produtos, setProdutos] = useState<ProdutosProps[]>([])
    const [showSuccessNotification, setShowSuccessNotification] = useState(false)
    const [showWarningNotification, setShowWarningNotification] = useState(false)
    const [messageNotification, setMessageNotification] = useState("")
    const [inputStoreBanner, setInputStoreBanner] = useState("")
    const [storeBanner, setStoreBanner] = useState<BannerProps[]>([])

    useEffect(() => {
        async function LoadProdutos() {
            const produtosRef = collection(db, 'produtos')
            const q = query(
                produtosRef, where("user", "==", user?.email)
            )

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
                setProdutos(lista)
            })
        }
        LoadProdutos()
    }, [user?.email])

    useEffect(() => {
        async function LoadPayments(){
            const paymentsRef = collection(db, 'payments')
            const qPayment = query(
                paymentsRef, where("user", "==", user?.email)
            )

            onSnapshot(qPayment, (snapshot) => {
                let listaPayment = [] as PaymentsProps[]

                snapshot.forEach((doc) => {
                    listaPayment.push({
                        id: doc.id,
                        user: doc.data().user,
                        payment: doc.data().payment,
                        userName: doc.data().userName,
                        created: doc.data().created
                    })
                })
                setStorePayment(listaPayment)
            })
        }
        LoadPayments()
    },[user?.email])

    useEffect(() => {
        async function LoadDescs(){
            const descsRef = collection(db, 'descriptions')
            const qDescs = query(
                descsRef, where("user", "==", user?.email)
            )

            onSnapshot(qDescs, (snapshot) => {
                let listaDecs = [] as DescsProps[]

                snapshot.forEach((doc) => {
                    listaDecs.push({
                        id: doc.id,
                        user: doc.data().user,
                        description: doc.data().description,
                        userName: doc.data().userName,
                        created: doc.data().created
                    })
                })
                setStoreDesc(listaDecs)
            })
        }
        LoadDescs()
    }, [user?.email])

    useEffect(() => {
        async function LoadBanners(){
            const bannersRef = collection(db, 'banners')
            const qBanners = query(
                bannersRef, where("user", "==", user?.email)
            )

            onSnapshot(qBanners, (snapshot) => {
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
        LoadBanners()
    }, [user?.email])

    async function handleRegisterProduct(event: FormEvent) {
        event.preventDefault()

        if (inputProdutos === '') {
            setMessageNotification("Complete the fields!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowWarningNotification(true)
            setTimeout(() => setShowWarningNotification(false), 1000)
            return
        }

        try {
            await addDoc(collection(db, 'produtos'), {
                produto: inputProdutos,
                descProduto: inputDesc,
                precoProduto: inputPreco,
                urlImageProduto: inputImg,
                created: new Date(),
                user: user?.email,
                userName: session?.user?.name
            })

            setInputProdutos("")
            setInputDesc("")
            setInputPreco("")
            setInputImg("")
            setMessageNotification("Success!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowSuccessNotification(true)
            setTimeout(() => setShowSuccessNotification(false), 1000)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleRegisterPaymentMethod(event: FormEvent) {
        event.preventDefault()
    
        if (inputPaymentMethod === '') {
            setMessageNotification("Complete the fields!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowWarningNotification(true)
            setTimeout(() => setShowWarningNotification(false), 1000)
            return
        }
    
        const paymentsRef = collection(db, 'payments')
        const qPayment = query(paymentsRef, where("user", "==", user?.email))
        const snapshot = await getDocs(qPayment)
    
        try {
            if (!snapshot.empty) {
                snapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref)
                })
            }
    
            await addDoc(collection(db, 'payments'), {
                payment: inputPaymentMethod,
                user: user?.email,
                created: new Date(),
                userName: session?.user?.name,
            })
    
            setInputPaymentMethod("")
            setMessageNotification("Success!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowSuccessNotification(true)
            setTimeout(() => setShowSuccessNotification(false), 1000)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleRegisterDesc(event: FormEvent){
        event.preventDefault()

        if(inputStoreDesc === ''){
            setMessageNotification("Complete the fields!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowWarningNotification(true)
            setTimeout(() => setShowWarningNotification(false), 1000)
            return
        }

        const descsRef = collection(db, 'descriptions')
        const qDescs = query(descsRef, where("user", "==", user?.email))
        const snapshot = await getDocs(qDescs)

        try {
            if(!snapshot.empty) {
                snapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref)
                })
            }

            await addDoc(collection(db, 'descriptions'), {
                description: inputStoreDesc,
                user: user?.email,
                created: new Date(),
                userName: session?.user?.name
            })

            setInputStoreDesc("")
            setMessageNotification("Success!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowSuccessNotification(true)
            setTimeout(() => setShowSuccessNotification(false), 1000)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleRegisterBanner(event: FormEvent){
        event.preventDefault()

        if(inputStoreBanner === ''){
            setMessageNotification("Complete the fields!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowWarningNotification(true)
            setTimeout(() => setShowWarningNotification(false), 1000)
            return
        }

        const bannerRef = collection(db, 'banners')
        const qBanner = query(bannerRef, where("user", "==", user?.email))
        const snapshot = await getDocs(qBanner)
        
        try {
            if(!snapshot.empty) {
                snapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref)
                })
            }

            await addDoc(collection(db, 'banners'), {
                banner: inputStoreBanner,
                user: user?.email,
                created: new Date(),
                userName: session?.user?.name
            })

            setInputStoreBanner("")
            setMessageNotification("Success!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowSuccessNotification(true)
            setTimeout(() => setShowSuccessNotification(false), 1000)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleDeleteProduto(id: string) {
        const docRef = doc(db, 'produtos', id)
        await deleteDoc(docRef)

        setMessageNotification("Product deleted!")
        setTimeout(() => setMessageNotification(""), 1000)
        setShowSuccessNotification(true)
        setTimeout(() => setShowSuccessNotification(false), 1000)
    }

    async function handleDeleteDescription(event: FormEvent) {
        event.preventDefault()
    
        const descsRef = collection(db, 'descriptions')
        const qDescs = query(descsRef, where("user", "==", user?.email))
        const snapshot = await getDocs(qDescs)
    
        if (!snapshot.empty) {
            snapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref)
            })
            setMessageNotification("Description removed!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowSuccessNotification(true)
            setTimeout(() => setShowSuccessNotification(false), 1000)
        } else {
            setMessageNotification("No description to remove!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowWarningNotification(true)
            setTimeout(() => setShowWarningNotification(false), 1000)
        }
    }

    async function handleDeletePayment(event: FormEvent){
        event.preventDefault()

        const paymentsRef = collection(db, 'payments')
        const qPay = query(paymentsRef, where("user", "==", user?.email))
        const snapshot = await getDocs(qPay)

        if(!snapshot.empty){
            snapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref)
            })
            setMessageNotification("Payment removed!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowSuccessNotification(true)
            setTimeout(() => setShowSuccessNotification(false), 1000)
        } else{
            setMessageNotification("No payment to remove!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowWarningNotification(true)
            setTimeout(() => setShowWarningNotification(false), 1000)
        }
    }

    async function handleDeleteBanner(event: FormEvent){
        event.preventDefault()

        const bannersRef = collection(db, 'banners')
        const qBanners = query(bannersRef, where("user", "==", user?.email))
        const snapshot = await getDocs(qBanners)

        if(!snapshot.empty){
            snapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref)
            })
            setMessageNotification("Banner removed!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowSuccessNotification(true)
            setTimeout(() => setShowSuccessNotification(false), 1000)
        } else{
            setMessageNotification("No banner to remove!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowWarningNotification(true)
            setTimeout(() => setShowWarningNotification(false), 1000)
        }
    }

    async function handleEditProduto(event: FormEvent) {
        event.preventDefault()

        if (!editProductId) return

        const docRef = doc(db, 'produtos', editProductId)

        try {
            await updateDoc(docRef, {
                produto: inputEditProdutos,
                descProduto: inputEditDesc,
                precoProduto: inputEditPreco,
                urlImageProduto: inputEditImg
            })

            setEditProductId(null)
            setMessageNotification("Edited successfully!")
            setTimeout(() => setMessageNotification(""), 1000)
            setShowSuccessNotification(true)
            setTimeout(() => setShowSuccessNotification(false), 1000)
        } catch (err) {
            console.log(err)
        }
    }

    function handleOpenEditModal(item: ProdutosProps) {
        setEditProductId(item.id)
        setInputEditProdutos(item.produto)
        setInputEditDesc(item.descProduto)
        setInputEditPreco(item.precoProduto)
        setInputEditImg(item.urlImageProduto)
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
                <title>Polygon | Store Setup</title>
            </Head>
            <div className={styles.containerProducts}>
                <p style={{
                    marginTop:'32px',
                    fontSize:'15px',
                    fontWeight:'500',
                }}>Welcome {session?.user?.name} 👋</p>
                <h1>Configure your store</h1>
                <form className={styles.formRegisterProduct} onSubmit={handleRegisterProduct}>
                    <input placeholder='Name of product...' type='text' value={inputProdutos} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputProdutos(event.target.value)} />
                    <input placeholder='Description of product...' value={inputDesc} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputDesc(event.target.value)} />
                    <input placeholder='Price of product...' type='number' value={inputPreco} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputPreco(event.target.value)} />
                    <input placeholder='Image of product...' type='text' value={inputImg} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputImg(event.target.value)} />
                    <button type='submit'><IoAddOutline size={30} /></button>
                </form>
                <form className={styles.formSetDesc} onSubmit={handleRegisterDesc}>
                    <input placeholder='Store description...' type='text' value={inputStoreDesc} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputStoreDesc(event.target.value)} />
                    <input placeholder={storeDesc.length > 0 ? `${storeDesc.map(description => description.description).join('')}` : 'Without any description...'} disabled/>
                    <button className={styles.btnConfirm} type='submit'><FaCheck size={20} /></button>
                    <button onClick={handleDeleteDescription} className={styles.btnDelete} type='submit'><FaTrash /></button>
                </form>
                <form className={styles.formSetPayment} onSubmit={handleRegisterPaymentMethod}>
                    <input placeholder='Payment method...' type='text' value={inputPaymentMethod} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputPaymentMethod(event.target.value)} />
                    <input placeholder={storePayment.length > 0 ? `${storePayment.map(payment => payment.payment).join('')}` : 'Without any method...'} disabled/>
                    <button className={styles.btnConfirm} type='submit'><FaCheck size={20} /></button>
                    <button onClick={handleDeletePayment} className={styles.btnDelete} type='submit'><FaTrash /></button>
                </form>
                <form className={styles.formSetBanner} onSubmit={handleRegisterBanner}>
                    <input placeholder='Store banner...' type='text' value={inputStoreBanner} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputStoreBanner(event.target.value)} />
                    <button className={styles.btnConfirm} type='submit'><FaCheck size={20} /></button>
                    <button onClick={handleDeleteBanner} className={styles.btnDelete} type='submit'><FaTrash /></button>
                </form>
                <img onError={handleBannerError} className={styles.imgBannerStore} src={storeBanner.length > 0 ? `${storeBanner.map(banner => banner.banner).join('')}` : 'https://i.ibb.co/59w7S8d/Captura-de-tela-2024-06-01-143737.png'} alt='Image banner user'/>
                <div className={`${showSuccessNotification ? styles.notificationMensageSuccess : styles.hidden} ${showWarningNotification ? styles.notificationMensageWarning : styles.hidden}`}>
                    <p>{messageNotification}</p>
                </div>
                <div className={styles.contentProduct}>
                    {status === 'loading' && (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    <h1>Your products</h1>
                    {produtos.length === 0 && (
                        <p>No products registered...</p>
                    )}
                    <div className={styles.contentAllProducts}>
                        {produtos.map((item) => (
                            <article className={styles.cardProducts} key={item.id}>
                                <img src={item.urlImageProduto} onError={handleImageError} alt={item.produto} />
                                <h1>{item.produto}</h1>
                                <h2>{item.descProduto}</h2>
                                <p>${item.precoProduto}</p>
                                <div className={styles.containerBtnsProduto}>
                                    <button onClick={() => handleDeleteProduto(item.id)}><FaTrash style={{ marginRight: '10px', }} /> Delete</button>
                                    <button onClick={() => handleOpenEditModal(item)} data-bs-toggle="modal" data-bs-target="#exampleModal" className={styles.btnEdit}><FaEdit style={{ marginRight: '10px', }} /> Edit</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`${styles.containerEditModal} ${"modal-content"}`}>
                        <h1>Edit your product</h1>
                        <form className={styles.formRegisterProduct} onSubmit={handleEditProduto}>
                            <input placeholder='Name of product...' type='text' value={inputEditProdutos} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputEditProdutos(event.target.value)} />
                            <input placeholder='Description of product...' type='text' value={inputEditDesc} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputEditDesc(event.target.value)} />
                            <input placeholder='Price of product...' type='number' value={inputEditPreco} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputEditPreco(event.target.value)} />
                            <input placeholder='Image of product...' type='text' value={inputEditImg} onChange={(event: ChangeEvent<HTMLInputElement>) => setInputEditImg(event.target.value)} />
                            <button data-bs-dismiss="modal" type='submit'><FaEdit size={20} /></button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            user: {
                email: session?.user?.email
            }
        }
    }
}