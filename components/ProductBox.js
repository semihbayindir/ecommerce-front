import { useEffect, useState } from "react";
import { styled } from "styled-components";
import ViewIcon from "@/icons/ViewIcon";
import { Helmet } from "react-helmet";
import Link from "next/link";
import ChatIcon from "@/icons/ChatIcon";
import StarIcon from "@/icons/StarIcon";
import HeartOutlineIcon from "@/icons/HeartOutlineIcon";
import HeartSolidIcon from "@/icons/HeartSolidIcon";
import axios from "axios";

const ProductWrapper = styled.div`
  button{
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

const WishlistButton = styled.button`
  border:0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top:0;
  right:0;
  background:transparent;
  cursor: pointer;
  ${props => props.wished ? `
    color:red;
  ` : `
    color:black;
  `}
  svg{
    width: 16px;
  }
`;

const Icons = styled.div`
  display: flex;
  font-size: 0.8rem;
  gap: 2.5px;
`;

const CardFooter = styled.div`
  padding: 10px;
  background-color: #e3dfde;
  border-radius: 2px;
  border: 2px solid #e3dfde;
  display: flex;
  justify-content: space-between;
`;

export default function ProductBox({ _id, title, images, views, likes, comments,wished=false,onRemoveFromWishlist=()=>{}, }) {
  const url = '/product/'+_id;
  const [isWished,setIsWished] = useState(wished);
  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios.post('/api/wishlist', {
      product: _id,
    }).then(() => {});
    setIsWished(nextValue);
  }
  
  const MAX_TITLE_LENGTH = 20;
  const shortenTitle = (title) => {
    if (title.length <= MAX_TITLE_LENGTH) {
      return title;
    }
    return title.slice(0, MAX_TITLE_LENGTH) + '...';
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js?func=proxy";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>

      <CardFooter>
        <Title href={url}>{shortenTitle(title)}</Title>
        <Icons>
          <ViewIcon width="14" height="14" />
          {views}
          <ChatIcon width="14" height="14" />
          {comments}
          <StarIcon width="14" height="14" />
          {likes}
        </Icons>
      </CardFooter>
    </ProductWrapper>
  );
}
