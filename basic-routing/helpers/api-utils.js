export async function getAllEvetns() {
    const response = await fetch('https://next-js-734e8-default-rtdb.firebaseio.com/events.json');
    const data = await response.json();
    const events = [];
    for(const key in data) {
        events.push({
            id: key,
            ...data[key]
        })
    }
    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvetns();
    return allEvents.filter((event) => event.isFeatured);
  }