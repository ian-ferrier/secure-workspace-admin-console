import type { ActivityEvent } from '../../types/workspace'

interface ActivityListProps {
  events: ActivityEvent[]
}

export function ActivityList({
  events,
}: ActivityListProps) {
  if (events.length === 0) {
    return (
      <p className="activity-empty">
        No recent activity recorded.
      </p>
    )
  }

  return (
    <ol className="activity-list">
      {events.map((event) => (
        <li key={event.id} className="activity-item">
          <div>
            <span className="activity-type">
              {event.type}
            </span>
            <p>{event.message}</p>
          </div>

          <time>{event.timestamp}</time>
        </li>
      ))}
    </ol>
  )
}
