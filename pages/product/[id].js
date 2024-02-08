import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import axios from "axios";
import Button from "components/Button.js";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ReactLoading from 'react-loading';
import WhiteBox from "@/components/WhiteBox";

export default function ProductPage() {
  const {addProduct} = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query; // URL'den 'id' parametresini alır

  const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
    @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

const CloudImage = styled.div`
width: 100%;
max-width: 100%;
`;

const CloudImageContainer = styled.div`
max-width: 100%;
overflow: hidden;
position: relative;
background-color: #fff;
border-radius: 10px;
padding: 30px;
`;
  useEffect(() => {
    // Ürünü id'ye göre getir
    if (id) {
      axios.get(`/api/products/${id}`).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);

  if (!product) {
    return  <div style={{ backgroundColor: '#222', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ReactLoading type="bubbles" color="#007bff" height={100} width={100} />
  </div>;
    // Ürün yüklenene kadar bekleme ekranı göster
  }

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
            <CloudImageContainer>
            <CloudImage
                className="cloudimage-360"
                data-folder="https://rotameta-ecommerce.s3.eu-central-1.amazonaws.com/"
                data-filename-x={`${product.title}{index}.png`}
                data-amount-x="30"
                data-pointer-zoom="2"
                data-responsive=""
              ></CloudImage>
            </CloudImageContainer>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <div>
              <PriceRow>
                <div>
                  <Price>${product.price}</Price>                
                </div>
                <div>
                  <Button primary="true" onClick={() => addProduct(product._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                  Add to cart</Button>          
                </div>
              </PriceRow>
            </div>
          </div>
        </ColWrapper>
      </Center>
      <Helmet>
                <script src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js?func=proxy"></script>
                <script src="https://cdn.scaleflex.it/filerobot/js-cloudimage-responsive/yall.min.js?v3.1.1"></script>
            </Helmet>
    </>
  );
}
