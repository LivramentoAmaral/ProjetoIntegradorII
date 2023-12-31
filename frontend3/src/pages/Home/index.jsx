import React, { useState } from "react";
import Header from "../../components/Header";
import ProductCard from "../../components/Products";
import Rodape from "../../components/Footer";
import style from "./style.module.css";
import Chat from "../../components/chat";
import FlowiseChatbot from "../../components/chat";


function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Header />
      <br />
      <div className={style.search}>
        <div>
          <input
            type="text"
            placeholder="Pesquisar Produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
            />
          <button >
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.71756 8.14956C2.71756 6.70863 3.28997 5.32672 4.30886 4.30782C5.32776 3.28893 6.70967 2.71652 8.1506 2.71652C9.59154 2.71652 10.9735 3.28893 11.9923 4.30782C13.0112 5.32672 13.5836 6.70863 13.5836 8.14956C13.5836 9.5905 13.0112 10.9724 11.9923 11.9913C10.9735 13.0102 9.59154 13.5826 8.1506 13.5826C6.70967 13.5826 5.32776 13.0102 4.30886 11.9913C3.28997 10.9724 2.71756 9.5905 2.71756 8.14956ZM8.1506 1.5411e-07C6.868 -0.000163521 5.60347 0.302407 4.45986 0.883102C3.31624 1.4638 2.32584 2.30622 1.56919 3.34186C0.812538 4.3775 0.311012 5.5771 0.1054 6.84312C-0.100212 8.10913 -0.00410535 9.4058 0.385904 10.6277C0.775914 11.8495 1.44881 12.9621 2.34988 13.8749C3.25094 14.7876 4.35472 15.4748 5.57145 15.8806C6.78818 16.2863 8.0835 16.3992 9.35206 16.2099C10.6206 16.0207 11.8266 15.5347 12.8719 14.7915L16.6981 18.6177C16.9543 18.8651 17.2974 19.002 17.6535 18.9989C18.0097 18.9958 18.3503 18.853 18.6022 18.6011C18.854 18.3493 18.9969 18.0086 18.9999 17.6525C19.003 17.2964 18.8661 16.9533 18.6187 16.6971L14.7939 12.8722C15.6608 11.653 16.1754 10.2187 16.2813 8.72638C16.3872 7.2341 16.0803 5.74147 15.3942 4.41204C14.7081 3.08261 13.6693 1.96769 12.3916 1.18946C11.1139 0.411227 9.64664 -0.000290737 8.1506 1.5411e-07Z" fill="#3D3D3D" />
            </svg>
          </button>
        </div>
      </div>

      <FlowiseChatbot />
      <br />
      <ProductCard searchTerm={searchTerm} />
      <br />
      <Rodape />
    </>
  )
}

export default Home;
