import EventItem from './event-item';
import classes from './event-list.module.css';

const EventList = (props) => {
    const { items } = props
    return (
        <ul className={classes.list}>
            {items.map((item) => {
                return (
                    <EventItem 
                        id={item.id} 
                        key={item.id}
                        title={item.title}
                        location={item.location}
                        date={item.date}
                        image={item.image}
                    />
                )
            })}
        </ul>
    )
}

export default EventList;