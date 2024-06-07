import styles from "./styles.module.css";
import Image from 'next/image'
import icon from '../../../public/assets/icon.png'
import { useSession, signIn, signOut } from 'next-auth/react'

//icon
import { FaUser } from "react-icons/fa6";

export default function NavBar() {
  const { data: session, status } = useSession()

  function LinkLogo() {
    window.location.href = '/'
  }

  function toMySettings() {
    window.location.href = '/mystore'
  }

  function toMyStore() {
    window.location.href = `/store/${session?.user?.name}`
  }

  return (
    <header className={styles.header}>
      <div className={styles.containerHeader}>
        <div onClick={LinkLogo} className={styles.containerIcon}>
          <h1>Poly<span>gon</span></h1>
          <Image className={styles.imgIcon} src={icon} alt="Icon" />
        </div>
        {status === 'loading' ? (
          <></>
        ) : session ? (
          <>
            <div style={{
              zIndex: '999',
            }} className="dropdown">
              <button className={styles.btnProfile} data-bs-toggle="dropdown">
                <p><FaUser style={{
                marginRight: '5px',
              }} size={12} />{session?.user?.email}</p></button>
              <ul className={`${styles.containerMenuProfile} ${"dropdown-menu dropdown-menu-end"}`}>
                <li onClick={toMyStore} className={styles.itemMenu}><a>My Store</a></li>
                <li onClick={toMySettings} className={styles.itemMenu}><a>Settings</a></li>
                <li className={styles.itemMenuLogout} onClick={() => signOut()}><a>Logout</a></li>
              </ul>
            </div>
          </>
        ) : (
          <button onClick={() => signIn("google")}>Login</button>
        )}
      </div>
    </header>
  );
}
