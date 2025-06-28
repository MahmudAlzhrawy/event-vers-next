        "use client";

        import { ManageEventVerseContext } from "@/app/Context/ManageEventVerseContext";
        import { useContext } from "react";
        import { CalendarDays, MapPin } from "lucide-react";

        export default function EventComponent() {
        const { events, removeEvent } = useContext(ManageEventVerseContext);

        return (
            <div className="min-h-screen bg-neutral-background py-16">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold italic text-text-heading">Upcoming Events</h1>
                <p className="text-sm text-text-muted mt-2">All events in one place</p>
            </div>

            <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {events.map(({ _id, title, privacy, description, location, date, createdAt, createdBy }) => (
                <div
                    key={_id}
                    className="bg-neutral-card border h-[300px] border-neutral-border rounded-2xl shadow-sm p-5 relative transition hover:shadow-xl"
                >
                    <h2 className="text-2xl font-bold text-text-heading mb-2">{title}</h2>
                    <p className="text-sm text-text-muted line-clamp-3 mb-4">{description}</p>

                    <div className="space-y-2 text-sm text-text-muted">
                    <div className="flex items-center">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        {new Date(date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {location}
                    </div>
                    <div
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        privacy === "Private"
                            ? "bg-red-200 text-red-800"
                            : "bg-green-200 text-green-800"
                        }`}
                    >
                        {privacy}
                    </div>
                    </div>

                    <div className="flex justify-between items-center text-xs mt-4 text-text-muted">
                    <span>By {createdBy.name}</span>
                    <span>{new Date(createdAt).toLocaleDateString()}</span>
                    </div>

                    <button
                    onClick={() => removeEvent(_id)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-full mt-4 transition"
                    >
                    Delete
                    </button>
                </div>
                ))}
            </div>
            </div>
        );
        }
