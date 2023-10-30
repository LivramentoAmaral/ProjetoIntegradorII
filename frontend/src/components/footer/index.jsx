import React from 'react';
import style from "./style.module.css"

function Rodape() {

    return (

        <footer className={style.footer}>

            <div className={style.footerContainer}>
                <div className={style.center}>
                    <div className={style.listcontaite}>
                        <h3>Product</h3>
                        <ul className={style.listaProduct}>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>

                        </ul>
                    </div>
                    <div className={style.listcontaite}>
                        <h3>Use cases</h3>
                        <ul className={style.listaProduct}>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>

                        </ul>
                    </div>
                    <div className={style.listcontaite}>
                        <h3>Resousers</h3>
                        <ul className={style.listaProduct}>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>

                        </ul>
                    </div>
                    <div className={style.listcontaite}>
                        <h3>Company</h3>
                        <ul className={style.listaProduct}>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>
                            <li><a href="#">Leadingpage</a></li>

                        </ul>
                    </div>
                </div>

            </div>

            <div className={style.logoLinks}>
                <div className={style.centerLinks}>
                    <div className={style.logo}>
                        <h1>Feira</h1>
                    </div>
                    <div className={style.links}>
                        <h3>Follow us</h3>
                        <div className={style.linksredirect}>
                            <a href="#"><img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" /></a>
                            <a href="#"><img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" /></a>
                            <a href="#"><img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" /></a>
                            <a href="#"><img src="https://img.icons8.com/ios-filled/50/000000/youtube-play.png" /></a>
                        </div>
                    </div>
                </div>

            </div>

        </footer>

    )

}

export default Rodape;