import React from "react";

type productSearchProps = {
    productNames?: string[],
    nameValueSelected: any
}

export const ProductSearch = (props: productSearchProps) => {
    const productNames = props.productNames;

    const onNameValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.nameValueSelected(e.target.value)
    }

    return (
        <>
            <form className="productSearchInput">
                <label htmlFor="productSearch" className="visuallyhidden">Search by Product Name:</label>
                {productNames &&
                    <input type="text" name="productSearch" className="d-block" onChange={onNameValueChange} placeholder="Search Product By Name" />
                }
            </form>
        </>
    )
}