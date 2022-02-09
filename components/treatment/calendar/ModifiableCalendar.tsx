import { Tooltip, Button } from "carbon-components-react";
import { DateTime } from "luxon";
import Calendar from "react-calendar";
import styled from "styled-components";
import { eqCalendarDate, getStandardDate } from "../../../common/util/dates";
import {
  HandleEventTypeString,
  HandleDotColor,
} from "../../../common/util/icons";
import ScheduledExaminationForm from "../../../db/ScheduledExaminationForm";
import { CalendarEventType } from "../../../helpers/doctor";
import { Loader } from "../../../hooks/useLoaderSWR";
import { colors } from "../../../theme/colors";
import { ArentFlex } from "../../ui/navigation/layout/ArentGrid";

export default function ModifiableCalendar({
  allEvents,
  setModalOpen,
  setCurrentDate,
  setCurrentEvent,
  currentDate,
  createdAt,
  fullScreen,
  isDoctor,
  scheduledExaminations,
}: {
  allEvents: CalendarEventType[];
  setModalOpen: any;
  createdAt: string;
  setCurrentDate: any;
  setCurrentEvent: any;
  currentDate: DateTime;
  fullScreen?: boolean;
  isDoctor: boolean;
  scheduledExaminations: Loader<ScheduledExaminationForm[]>;
}) {
  return (
    <CalendarWrapper>
      <Calendar
        view="month"
        tileDisabled={(date) =>
          DateTime.fromMillis(date.date.getTime()) <
          DateTime.now().minus({ days: 1 })
        }
        onClickDay={(date) => {
          if (!isDoctor) {
            setCurrentDate(DateTime.fromMillis(date.getTime()));
            return null;
          }
          const event = allEvents.find((event) => {
            return eqCalendarDate(
              new Date(event.date).getTime(),
              date.getTime()
            );
          });

          if (event) {
            setCurrentDate(DateTime.fromMillis(date.getTime()));
            setCurrentEvent(event);
            return console.log("Event is here!");
          }
          setCurrentDate(DateTime.fromMillis(date.getTime()));
          return console.log("No event.");
        }}
        tileClassName={(tile) => {
          console.log("Created at: ", createdAt);
          if (
            eqCalendarDate(
              tile.date.getTime(),
              DateTime.fromISO(createdAt).toMillis()
            )
          ) {
            return "start-date-event";
          }

          const event = allEvents.find((event) => {
            return eqCalendarDate(
              new Date(event.date).getTime(),
              tile.date.getTime()
            );
          });

          if (event) {
            if (event.type === "treatment") {
              return "calendar-event-treatment";
            }
            return "calendar-event";
          }

          return "";
        }}
        tileContent={(tile) => {
          const event = allEvents.filter((event) => {
            return eqCalendarDate(
              new Date(event.date).getTime(),
              tile.date.getTime()
            );
          });

          if (
            eqCalendarDate(tile.date.getTime(), new Date(createdAt).getTime())
          ) {
            event.push({
              date: createdAt,
              id: null,
              name: "Start date",
              type: "start",
            });
          }

          if (
            scheduledExaminations &&
            scheduledExaminations.status === "ready"
          ) {
            scheduledExaminations.value
              .filter(
                (exam) => exam.date.toString() === tile.date.toISOString()
              )
              .map((exam) => {
                console.log("EXAMINATION IN TIMELINE", exam);
                event.push({
                  date: DateTime.fromISO(exam.date),
                  id: exam.id,
                  name: exam.name,
                  type:
                    exam.status === "completed"
                      ? "completedExamination"
                      : "pendingExamination",
                });
              });
          }

          if (event[0]) {
            return (
              <>
                <Tooltip
                  triggerId="tooltip-target"
                  direction="bottom"
                  tabIndex={0}
                >
                  <p style={{ marginBottom: 5 }}>
                    {getStandardDate(currentDate.toMillis())}
                  </p>
                  {event.map((event) => {
                    return (
                      <ArentFlex gap={5}>
                        {HandleEventTypeString[event.type]}
                        <SmallDot color={HandleDotColor[event.type]} />
                      </ArentFlex>
                    );
                  })}
                  <div className="bx--tooltip__footer">
                    {isDoctor && (
                      <Button
                        size="small"
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onClick={() => setModalOpen(true)}
                      >
                        <ArentFlex direction="column">
                          Create New Event
                        </ArentFlex>
                      </Button>
                    )}
                  </div>
                </Tooltip>

                <ArentFlex gap={2}>
                  {fullScreen ? (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                      }}
                    >
                      {event.map((event) => {
                        return (
                          <div
                            className={
                              event.type === "start" ? "start-date-stripe" : ""
                            }
                            style={{
                              background: "#d3d3d3",
                              width: "100%",
                              padding: "0px 5px",
                              borderLeft: `4px solid ${
                                HandleDotColor[event.type]
                              } `,
                            }}
                          >
                            <ArentFlex
                              width="100%"
                              gap={2}
                              align="end"
                              justify="start"
                            >
                              <strong>
                                {event.type === "treatment"
                                  ? event.comments
                                  : HandleEventTypeString[event.type]}
                              </strong>
                            </ArentFlex>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    event.map((event) => (
                      <SmallDot color={HandleDotColor[event.type]} />
                    ))
                  )}

                  {/* </ArentFlex> */}
                </ArentFlex>
              </>
            );
          } else {
            return (
              <Tooltip
                triggerId="tooltip-target"
                direction="bottom"
                tabIndex={0}
              >
                <p>{getStandardDate(currentDate.toMillis())}</p>
                <div className="bx--tooltip__footer">
                  {isDoctor && (
                    <Button
                      size="small"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={() => setModalOpen(true)}
                    >
                      Create New Event
                    </Button>
                  )}
                </div>
              </Tooltip>
            );
          }

          return null;
        }}
      />
    </CalendarWrapper>
  );
}

const SmallDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;

  margin: 0 auto;
  margin-top: 4px;
  background-color: ${(props) => props.color};
  align-self: center;
  justify-self: center;
`;

const CalendarWrapper = styled.div`
  & * {
    transition: all 0.2s;
  }
  & strong {
    font-size: 10px;
  }
  & button {
    position: relative;
  }
  width: 100%;
  & > div {
    border: none;
    width: 100%;
    border-radius: 10px;
    font-size: 10px !important;
    background: #f4f4f4;
    text-overflow: ellipsis;

    white-space: nowrap;
    overflow: hidden;
  }

  & .calendar-event {
    background-color: ${colors.blue}11;
    color: black;
    font-size: 10px !important;
    & strong {
      font-size: 10px !important;
      color: black !important;
    }
  }

  & .calendar-event-treatment {
    background-color: ${colors.mint};
    background: url("https://images.unsplash.com/photo-1609840534277-88833ef3ddeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dHJlYXRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60");
    background-size: cover;
    color: black;
    font-size: 10px !important;
    & strong {
      color: black;
    }
  }

  & .start-date-event {
    color: black;
    font-size: 10px !important;
  }

  & .start-date-stripe {
    background: black !important;
    color: white;
  }

  & .bx--tooltip__trigger {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    & svg {
      display: none;
    }
  }
`;
