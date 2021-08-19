import Card from "../components/ui/Card";
import LayoutBase from "../components/ui/navigation/layout";
import VideoChat from "../components/video/VideoChat";

export default function Meetings() {
  const dummy = [
    {
      id: "1",
      name: "Test meeting",
      date: "2021-08-20",
    },
    {
      id: "2",
      name: "Test meeting 2",
      date: "2021-08-19",
    },
  ];

  return (
    <LayoutBase title="Meetings">
      <div>
        <h3>Today</h3>
        {dummy.flatMap((meeting) =>
          meeting.date == "2021-08-19"
            ? [
                <Card key={meeting.id}>
                  {meeting.name}
                  <VideoChat />
                </Card>,
              ]
            : [null]
        )}
      </div>
    </LayoutBase>
  );
}
