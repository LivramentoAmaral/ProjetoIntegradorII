import React from 'react';
import style from "./style.module.css"
import svg1 from"../../assets/social.svg"
import svg2 from"../../assets/social1.svg"
import svg3 from"../../assets/social2.svg"
import svg4 from"../../assets/social3.svg"
import svg5 from"../../assets/social5.svg"


function Rodape() {

    return (

        <footer className={style.footer}>
            <div className={style.logo}>
                <h1>Feira</h1>

            </div>
            <div className={style.Followus}>
                <h1>Siga-nos</h1>
                <div className={style.icons}>
                    
                    <a href=""><img src={svg1} alt="" /></a>
                    <a href=""><img src={svg2} alt="" /></a>
                    <a href=""><img src={svg3} alt="" /></a>
                    <a href=""><img src={svg4} alt="" /></a>
                    <a href=""><img src={svg5} alt="" /></a>

                </div>
            </div>
            <div className={style.credicts}>
                <p> © 2023 - Todos os direitos reservados</p>
            </div>


        </footer>

    )

}

export default Rodape;