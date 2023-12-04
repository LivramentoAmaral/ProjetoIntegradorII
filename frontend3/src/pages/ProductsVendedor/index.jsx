import React, { useEffect, useState, useContext } from "react";
import api from "../../api";
import HeaderVendedor from "../../components/HeaderVendedor";
import ProductEditModal from "../../components/ProductEditModal";
import ProductItem from "../../components/ProductIntem";
import Rodape from "../../components/Footer";
import style from "./style.module.css";
import ProductAddModal from "../../components/ProductModal";
import swal from "sweetalert";
import AuthContext from "../../context/AuthContext";
import {jwtDecode} from "jwt-decode";


const ProductsVendedor = () => {
    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const Authorization = localStorage.getItem("token");

    const getTokenPayload = () => {
        const token = localStorage.getItem('token');
        if (token) {
          return jwtDecode(token); // Decodifica o token JWT
        }
        return null;
      };
      
      const user_id = getTokenPayload()?.id;

    let {user,logout} = useContext(AuthContext);

    useEffect(() => {
        fetchUserProducts();
        fetchUserData();
    }, []);

    const fetchUserProducts = async () => {
        try {
            const response = await api.get(`/${user_id}/products`, {
                headers: {
                    "Authorization": `Bearer ${Authorization}`,
                },
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching user products:", error);
        }
    };
    

    const fetchUserData = async () => {
        try {
            const userResponse = await api.get(`/users/${user_id}`);
            setUserData(userResponse.data); // Assuming the user data contains a property like 'name'
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleUpdateProduct = async (updatedProduct) => {
        const handleEditProduct = (product) => {
            setSelectedProduct(product);
            setIsModalOpen(true);
        };
    }

    const handleDeleteProduct = async (productId) => {
        try {
            // Consultar a API para obter os detalhes do produto com base no ID
            const productDetails = await api.get(`/products/${productId}`
            ,{
                headers: {
                    "Authorization": `Bearer ${Authorization}`,
                },
            });
            const productName = productDetails.data.productName;

            // Exibir o SweetAlert para confirmar a exclusão
            const willDelete = await swal({
                title: "Deseja Excluir?",
                text: ` Vai excluir o produto ${productName}!`,
                icon: "warning",
                buttons: ["Cancelar", "Deletar"],
                dangerMode: true,
            });

            if (willDelete) {
                // Se o usuário confirmar a exclusão, chamar a API para deletar o produto
                await api.delete(`/products/${user_id}/${productId}`, {
                    headers: {
                        "Authorization": `Bearer ${Authorization}`,
                    },
                });
                // Atualizar a lista de produtos após a exclusão bem-sucedida
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== productId)
                );

                // Exibir um SweetAlert para indicar que o produto foi excluído com sucesso
                swal(`O Produto ${productName} Deletado Com Sucesso!`, {
                    icon: "success",
                });
            } else {
                // Se o usuário cancelar a exclusão, exibir um SweetAlert indicando que o produto está seguro
                swal("Produto não foi deletado!");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            // Trate os erros adequadamente aqui
        }
    };


    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    const filteredProducts = searchTerm
        ? products.filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : products;
    const lessThanFourProductsStyle = {
        padding: "20px",
        height: "60vh",
    };

    const moreThanFourProductsStyle = {
        height: "100%",
    };


    return (
        <>
            <HeaderVendedor />
            <br />
            <main className={style.mainProdutor}
                style={
                    filteredProducts.length < 4
                        ? lessThanFourProductsStyle
                        : moreThanFourProductsStyle
                }>
                <div className={style.menuVendedor}>
                    <div className={style.search}>
                        <div>
                            <input
                                type="text"
                                placeholder="Pesquisar Produto..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button onChange={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.71756 8.14956C2.71756 6.70863 3.28997 5.32672 4.30886 4.30782C5.32776 3.28893 6.70967 2.71652 8.1506 2.71652C9.59154 2.71652 10.9735 3.28893 11.9923 4.30782C13.0112 5.32672 13.5836 6.70863 13.5836 8.14956C13.5836 9.5905 13.0112 10.9724 11.9923 11.9913C10.9735 13.0102 9.59154 13.5826 8.1506 13.5826C6.70967 13.5826 5.32776 13.0102 4.30886 11.9913C3.28997 10.9724 2.71756 9.5905 2.71756 8.14956ZM8.1506 1.5411e-07C6.868 -0.000163521 5.60347 0.302407 4.45986 0.883102C3.31624 1.4638 2.32584 2.30622 1.56919 3.34186C0.812538 4.3775 0.311012 5.5771 0.1054 6.84312C-0.100212 8.10913 -0.00410535 9.4058 0.385904 10.6277C0.775914 11.8495 1.44881 12.9621 2.34988 13.8749C3.25094 14.7876 4.35472 15.4748 5.57145 15.8806C6.78818 16.2863 8.0835 16.3992 9.35206 16.2099C10.6206 16.0207 11.8266 15.5347 12.8719 14.7915L16.6981 18.6177C16.9543 18.8651 17.2974 19.002 17.6535 18.9989C18.0097 18.9958 18.3503 18.853 18.6022 18.6011C18.854 18.3493 18.9969 18.0086 18.9999 17.6525C19.003 17.2964 18.8661 16.9533 18.6187 16.6971L14.7939 12.8722C15.6608 11.653 16.1754 10.2187 16.2813 8.72638C16.3872 7.2341 16.0803 5.74147 15.3942 4.41204C14.7081 3.08261 13.6693 1.96769 12.3916 1.18946C11.1139 0.411227 9.64664 -0.000290737 8.1506 1.5411e-07Z" fill="#3D3D3D" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button onClick={handleOpenAddModal}>
                        Adicionar produto
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76515 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76515 3.51472 3.51472C5.76515 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12ZM12 5.57143C12.341 5.57143 12.668 5.70689 12.9091 5.94801C13.1503 6.18912 13.2857 6.51615 13.2857 6.85714V10.7143H17.1429C17.4838 10.7143 17.8109 10.8497 18.052 11.0909C18.2931 11.332 18.4286 11.659 18.4286 12C18.4286 12.341 18.2931 12.668 18.052 12.9091C17.8109 13.1503 17.4838 13.2857 17.1429 13.2857H13.2857V17.1429C13.2857 17.4838 13.1503 17.8109 12.9091 18.052C12.668 18.2931 12.341 18.4286 12 18.4286C11.659 18.4286 11.332 18.2931 11.0909 18.052C10.8497 17.8109 10.7143 17.4838 10.7143 17.1429V13.2857H6.85714C6.51615 13.2857 6.18912 13.1503 5.94801 12.9091C5.70689 12.668 5.57143 12.341 5.57143 12C5.57143 11.659 5.70689 11.332 5.94801 11.0909C6.18912 10.8497 6.51615 10.7143 6.85714 10.7143H10.7143V6.85714C10.7143 6.51615 10.8497 6.18912 11.0909 5.94801C11.332 5.70689 11.659 5.57143 12 5.57143Z" fill="white" />
                        </svg>
                    </button>
                    <div className={style.Farm}>
                        <h3>{userData ? `${userData.farm}` : 'Nome da Fazenda'}</h3>
                    </div>
                </div>

                <div className={style.tabela}>
                    {filteredProducts.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Todos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <ProductItem
                                        key={product._id}
                                        product={product}
                                        onEdit={handleEditProduct}
                                        onDelete={handleDeleteProduct}
        
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>
                            {searchTerm
                                ? 'Nenhum produto encontrado.'
                                : 'Sem produtos cadastrados.'}
                        </p>
                    )}
                </div>
            </main>
            <br />
            <Rodape />

            <ProductAddModal
                user_id={user_id}
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                setProducts={setProducts}
                Authorization={Authorization}
            />

            <ProductEditModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                }}
                Authorization={Authorization}
                product={selectedProduct}               
                user_id={user_id}
                setProducts={setProducts}
            />
        </>
    );
};

export default ProductsVendedor;
