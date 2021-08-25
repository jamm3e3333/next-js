import router from "next/router";

const ClientProjectsPage = () => {

    const loadProjectHandler = () => {
        router.push({
            pathname: '/client/[id]/[clientproject]',
            query: {
                id: 'jakub',
                clientproject: 'projecta'
            }
        })
    }
    return (
        <div>
            <h1>The projects of a given client</h1>
            <button onClick={loadProjectHandler}>Load Project A</button>
        </div>
    )
}

export default ClientProjectsPage;