import { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSales = (props) => {
    // const [isLoading, setIsLoading] = useState(false);
    // const [isError, setIsError] = useState(false);

    // useEffect( () => {
    //     setIsLoading(true);
    //     setIsError(false);
       
    //     fetch('https://next-js-734e8-default-rtdb.firebaseio.com/sales.json')
    //         .then(response => {
    //             if(response.status !== 200) {
    //                 throw new Error("Data not fetched");
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setIsLoading(false);
    //             const transformedSales = [];
    //             for(const key in data) {
    //                 transformedSales.push({
    //                     id: key, 
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 });
    //             }
    //             setSales(transformedSales);
    //         })
    //         .catch(e => {
    //             setIsLoading(false);
    //             setIsError(true);
    //         })
    // }, [])

    const [sales, setSales] = useState(props.sales);
    const { data, error } = useSWR('https://next-js-734e8-default-rtdb.firebaseio.com/sales.json');

    useEffect(() => {
        if(data) {
            const transformedSales = [];
            for(const key in data) {
                transformedSales.push({
                    id: key, 
                    username: data[key].username,
                    volume: data[key].volume
                });
            }
            setSales(transformedSales);
        }
    }, [data]);

    if(error) {
        return <h1>Data not fetched!</h1>
    }
    if(!data && !sales) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <ul>
                {(sales && sales.length) && sales.map((sale) => {
                    return (
                        <li key={sale.id}>
                            <p>{sale.username} - ${sale.volume}</p>
                        </li>
                    )
                })}
            </ul>

        </>
    )
}

export async function getStaticProps() {
    try{
        const response = await fetch('https://next-js-734e8-default-rtdb.firebaseio.com/sales.json')
        
        if(response.status !== 200) {
            throw new Error("Data not fetched");
        }
        const data = await response.json();
        const transformedSales = [];

        for(const key in data) {
            transformedSales.push({
                id: key, 
                username: data[key].username,
                volume: data[key].volume
            });
        }
        return {
            props: { sales: transformedSales}
        }
    }
    catch(e) {
        return {
            props: { sales: undefined }
        }
    }
}

export default LastSales;