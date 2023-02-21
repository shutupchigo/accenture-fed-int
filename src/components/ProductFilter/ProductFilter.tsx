import React from "react";

type ProductFilterProps = {
    productTypes?: string[],
    typeValueSelected: any
}


function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const ProductFilter = (props: ProductFilterProps) => {
    const productTypes = props.productTypes;

    const onTypeValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.typeValueSelected(e.target.value)
    }

    return (
        <>
            <span>Filter By &nbsp;</span>
            {productTypes &&
                <select name="productTypeFilter" onChange={onTypeValueChange} >
                    <option value="all">Type</option>
                    {productTypes.map(item => (
                        <option key={item} value={item}>{capitalizeFirstLetter(item)}</option>
                    ))}
                </select>
            }
        </>
    )
}