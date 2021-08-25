import {useRouter, withRouter} from 'next/router';

const PortfolioProjectPage = () => {
    const router = useRouter();
    router.pathname
    return (
        <div>
            <h1>The portfolio page</h1>
        </div>
    )
}

export default PortfolioProjectPage;