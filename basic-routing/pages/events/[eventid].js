import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";

import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.eventid;
  const event = getEventById(eventId);
    console.log(event);
  if (!eventId) {
    return (
        <>
            <ErrorAlert>
                <p>No event found</p>;
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show all events</Button>
            </div>
        </>
    )
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics 
        date={event.date} 
        address={event.location} 
        image={event.image} 
        imageAlt={event.title}
        />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
