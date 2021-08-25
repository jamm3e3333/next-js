import { getFilteredEvents } from "../../dummy-data";
import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = () => {
    const router = useRouter();
    const filteredData = router.query.slug;
    
    if(!filteredData){
        return <p className='center'>Loading...</p>
    }

    const [ filteredYear, filteredMonth ] = filteredData;
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter. Please correct the input.</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show all events</Button>
                </div>
            </>
        )
    }
    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });
    if(!filteredEvents || !filteredEvents.length){
        return (
            <>
                <ErrorAlert>
                    <p>No events found!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show all events</Button>
                </div>
            </>
        )
    }

    const date = new Date(numYear, numMonth -1);
    
    return (
        <>
            <ResultsTitle date={date} />
            <EventList 
                items={filteredEvents}
            />
        </>
    )
}

export default FilteredEventsPage;