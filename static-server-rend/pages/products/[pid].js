import Link from 'next/link';
import path from 'path';
import fs from 'fs/promises';

const ProductDetailPage = (props) => {
    const {loadedProduct} = props;
    if(!loadedProduct) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <>
            <button>
                <Link href="/">Home page</Link>
            </button>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </>
    )
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data','dummy-backend.json');
    const dataJson = await fs.readFile(filePath);
    const data = JSON.parse(dataJson);
    return data;
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;

    const data = await getData();

    const product = data.products.find(product => product.id === productId);
    if(!product) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map(product => product.id);

    const pathsWithParams = ids.map(id => ({params: {pid: id} }));
    return {
        paths: pathsWithParams,
        fallback: true
    }
}

export default ProductDetailPage;