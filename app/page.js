import Image from 'next/image'
import Header from "./components/Header";
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import styles from './page.module.scss'


export default function Home() {
  return (
      <div className='test-class'>
        <nav className={`navbar navbar-expand-lg bg-body-tertiary`}>
            <div className="container-fluid g-0 text-center">
            <div className={`container-fluid ${styles.pokedex_clip}`}>
            <div className="navbar-brand mb-0 h1 text-warning d-flex align-items-center">
                    <figure className={`${styles.blue_circle_eye}`}></figure>

                    <figure className={`${styles.red_circle_eye} mb-3`}></figure>
                    <figure className={`${styles.yellow_circle_eye} mb-3`}></figure>
                    <figure className={`${styles.green_circle_eye} mb-3`}></figure>
            </div>
            </div>
                <button className="navbar-toggler ms-auto mt-2 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
        <h1> This is the home/default login page</h1>
      </div>
  )
}
