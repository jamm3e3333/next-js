import Link from 'next/Link';

const clients = [
    {id: 'jakub', name: 'Jakub'},
    {id: 'josef', name: 'Josef'},
]

const ClientPage = () => {
    return (
        <div>
            <h1>The client page</h1>
            <ul>
                {clients.map((client) => {
                    return (
                        <li key={client.id}>
                            <Link key={client.id} href={{
                                pathname: '/clients/[id]',
                                query: {
                                    id: client.id
                                }
                            }}>{client.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ClientPage;