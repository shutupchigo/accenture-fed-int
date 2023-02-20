import React from "react";
import './ProductCard.css'

type ProductCardProps = {
    productName?: string,
    productPrice?: boolean,
    isSale?: boolean
    productType?: string,
    productImage?: string
}

type ProductImageProps = {
    productImage?: string,
    productName?: string
}

function ProductImage(props: ProductImageProps) {
    if (props.productImage) {
        return <img
            className="img-fluid"
            src={`../../assets/images/${props?.productImage}`}
            alt={props?.productName}
            title={props?.productName} />
    }
    return <img className="img-fluid" src="https://via.placeholder.com/450x450" alt={props?.productName} title={props?.productName} />;
}

export const ProductCard = (props: ProductCardProps) => {
    return (
        <>
            <div className="product-card">
                <div className="product-card__header">
                    <figure>
                        <ProductImage productImage={props?.productImage} productName={props?.productName} />
                    </figure>
                </div>
                <div className="product-card__body">
                    {props?.productType &&
                        <span className="tag">{props?.productType}</span>
                    }
                    <h4>{props?.productName}</h4>
                    <p>{props?.productPrice}</p>
                </div>
                {props?.isSale &&
                    <div className="product-card__footer">
                        <span>🌟 On Sale 🌟</span>
                    </div>
                }
            </div>
        </>
    )
}