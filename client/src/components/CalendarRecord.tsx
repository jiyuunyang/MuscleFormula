import styled from "styled-components";
export const CalendarRecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;
export const RecordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: large;
  border-bottom: solid 1px lightgrey;
  padding-bottom: 0.3rem;
  > div {
    padding-right: 0.3rem;
    font-size: medium;
  }
  > .exercise-name {
    width: 5rem;
  }
  > .exercise-weight {
    width: 3.5rem;
    text-align: right;
  }
  > .exercise-count {
    width: 3.5rem;
    text-align: right;
  }
  > div:last-child {
    width: 4.2rem;
  }
`;

interface RecordType {
  genre: string;
  weight: number;
  count: number;
  time_record: number;
}

interface CalendarRecordProps {
  record: RecordType;
}

const CalendarRecord: React.FC<CalendarRecordProps> = ({
  record,
}) => {
  function secToTime(duration: number) {
    let seconds: number | string = Math.floor(duration % 60);
    let minutes: number | string = Math.floor((duration / 60) % 60);
    let hours: number | string = Math.floor((duration / (60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
  }

  return (
    <CalendarRecordContainer>
      <RecordContainer>
        <div className="exercise-name">{record.genre}</div>
        <div className="exercise-weight">{record.weight} kg</div>
        <div className="exercise-count">{record.count} 회</div>
        <div>
          {typeof record.time_record === "number"
            ? secToTime(record.time_record)
            : null}
        </div>
      </RecordContainer>
    </CalendarRecordContainer>
  );
};
export default CalendarRecord;
