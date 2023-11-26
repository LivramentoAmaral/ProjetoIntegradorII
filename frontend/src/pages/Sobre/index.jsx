import React from "react";
import Header from "../../components/Header";
import Rodape from "../../components/footer";
import styles from "./style.module.css"; 
import ProdutorImage from "../../assets/peodutorVendendo.jpeg"
import ProdutosImage from "../../assets/produtosdafeira.jpeg"



function Sobre() {
  return (
    <>
      <Header />

      <main className={styles.aboutPage}>
        <section>
          <h2>Quem Somos ?</h2>
          <div className={styles.aboutSection}>
            <div className={styles.text}>
              <p>
                Somos uma plataforma dedicada a apoiar pequenos produtores, oferecendo-lhes
                uma vitrine online para seus produtos. Nosso intuito é conectar esses produtores
                diretamente aos clientes, proporcionando uma experiência de compra simples e
                incentivando a economia local.
              </p>
            </div>
            <div className={styles.image}>
              <img src={ProdutorImage} alt="Produtor vendendo na feira" />
            </div>
          </div>
        </section>
        <section>
          <h2>Nosso Propósito</h2>
          <div className={styles.aboutSection}>
            <div className={styles.text}>
              <p>
                Nosso propósito é promover a sustentabilidade, valorizar o trabalho dos pequenos
                produtores e oferecer aos consumidores acesso a produtos frescos e de qualidade,
                cultivados e produzidos com paixão e cuidado.
              </p>
            </div>
            <div className={styles.image}>
              <img src={ProdutosImage} alt="Produtos frescos" />
            </div>
          </div>
        </section>
      </main>

      <Rodape />
    </>
  );
}

export default Sobre;
