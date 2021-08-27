import { getAllEvents } from '../../helpers/api-utils';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';

const AllEventsPage = (props) => {
    const events = props.events;
    const router = useRouter();
    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath);
    }

    return (
        <>
            <EventSearch onSearch={findEventsHandler}/>
            <EventList 
                items={events}
            />S
        </>
    )
}
export async function getStaticProps() {
    const allEvents = await getAllEvents();
    return {
        props: {
            events: allEvents
        },
        revalidate: 60
    }

}
export default AllEventsPage;