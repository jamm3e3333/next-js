import { getFilteredEvents } from "../../helpers/api-utils";

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = (props) => {

    if(props.hasError) {
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
    const filteredEvents = props.events;

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

    const date = new Date(props.date.year, props.date.month -1);
    return (
        <>
            <ResultsTitle date={date} />
            <EventList 
                items={filteredEvents}
            />
        </>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const filteredData = params.slug;

    const [ filteredYear, filteredMonth ] = filteredData;
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(
        isNaN(numYear) || 
        isNaN(numMonth) || 
        numYear > 2030 || 
        numYear < 2021 || 
        numMonth < 1 || 
        numMonth > 12) {
            return {
                props: {
                    hasError: true
                }
            }
    }
    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    });
    if(!filteredEvents || !filteredEvents.length){
        return {
            props: {
                hasError: true
            }
        }
    }
    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    }
} 

export default FilteredEventsPage;