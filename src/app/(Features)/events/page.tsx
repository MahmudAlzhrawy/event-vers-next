import ManageContextProvider from "@/app/Context/ManageEventVerseContext";
import EventComponent from "@/components/featuers/Events";

export default function EventsPage() {
  return (
    <ManageContextProvider>
      <EventComponent/>
    </ManageContextProvider>
  );
}