import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

function Home(props) {
  const { products } = props;
  return (
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id} >
              <Link href={`/products/${product.id}`}>
                {product.title}
              </Link>
            </li>
            
          )
        })}
      </ul>
  )
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')

  try{
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
  
    if(!data) {
      return {
        redirect: {
          destination: '/no-data'
        }
      }
    }
    if(!data.products.length) {
      return {notFound : true};
    }
  
    return { props : {
      products : data.products
      },
      revalidate: 10,
    }
  }
  catch(e) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }

}

export default Home;