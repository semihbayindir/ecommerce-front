import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { Helmet } from "react-helmet";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  div:nth-child(1){
    order:2;
  }
  @media screen and (min-width: 768px){
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1){
      order:0;
    }
}
`;
const Column = styled.div`
  display: flex;
  align-items: flex;
  overflow:hidden;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
          <ColumnsWrapper>
            <Column>
              <div>
                <Title>{product.title}</Title>
                <Desc>{product.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink href={"/products/" + product._id} outline={1} white={1}>
                    Read More
                  </ButtonLink>
                  <Button primary onClick={addFeaturedToCart}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                    Add to cart
                  </Button>
                </ButtonsWrapper>
              </div>
            </Column>
            <Column>
            <div>
              <Helmet>
                <script src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js?func=proxy"></script>
                <script src="https://cdn.scaleflex.it/filerobot/js-cloudimage-responsive/yall.min.js?v3.1.1"></script>
            </Helmet>
              <div
              style={{
                width: '',
                maxHeight: '250px',
              }}
                className="cloudimage-360"
                data-folder="https://rotameta-ecommerce.s3.eu-central-1.amazonaws.com/"
                data-filename-x={`${product.title}{index}.png`}
                data-amount-x="30"
                data-pointer-zoom="2"
                data-responsive=""
              ></div>
            </div>            
            </Column>
          </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
