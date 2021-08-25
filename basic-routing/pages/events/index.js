import { getAllEvents } from "../../dummy-data";
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
const AllEventsPage = () => {
    const events = getAllEvents();
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

export default AllEventsPage;