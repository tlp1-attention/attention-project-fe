import { useAuth } from "@features/auth/hooks/useAuth";
import { ReportChart } from "@features/reports/ReportChart";
import { ErrorScreen } from "@features/ui/error-screen/ErrorScreen";
import { Spinner } from "@features/ui/spinner/Spinner";
import { usePromise } from "@hooks/usePromise";
import { getEventsByWeek } from "@services/events";
import { getCompletedExercisesByWeek } from "@services/readings";
import dayjs from "dayjs";
import { useCallback } from "react";
import "@features/reports/Report.css";
import { ReportTable } from "@features/reports/ReportTable";

export function ReportPage() {
  const { token, user } = useAuth()!;
  const eventsResource = usePromise(
    useCallback(() => getEventsByWeek({ token: token ?? "" }), [token])
  );
  const readingResource = usePromise(
    useCallback(() => getCompletedExercisesByWeek({ token: token ?? "" }), [
      token
    ])
  );

  const loader = (
    <div className="w-100">
      <Spinner />
    </div>
  );
  console.log(eventsResource);

  return (
    <>
      <h1>Reporte de {user?.name}</h1>
      <div className="chart-container fs-4">
        <div className="event-report shadow">
          {eventsResource.loading && !eventsResource.error && loader}
          {eventsResource.error && (
            <ErrorScreen error={eventsResource.error as Error} />
          )}
          {eventsResource.data && (
            <ReportChart
              type="bar"
              data={eventsResource.data.map(e => e.eventCount)}
              chartLabel="Eventos registrados por semana"
              labels={eventsResource.data.map(group => {
                const startWeekDate = dayjs(group.startWeek).format("DD/MM");
                const endWeekDate = dayjs(group.endWeek).format("DD/MM");
                return `${startWeekDate} - ${endWeekDate}`;
              })}
            />
          )}
        </div>
        <div className="reading-report shadow">
          {readingResource.loading && !readingResource.error && loader}
          {readingResource.error && (
            <ErrorScreen error={readingResource.error as Error} />
          )}
          {readingResource.data && (
            <ReportChart
              type="line"
              data={readingResource.data.map(e => e.readingCount)}
              chartLabel="Ejercicios completados por semana"
              labels={readingResource.data.map(group => {
                const startWeekDate = dayjs(group.startWeek).format("DD/MM");
                const endWeekDate = dayjs(group.endWeek).format("DD/MM");
                return `${startWeekDate} - ${endWeekDate}`;
              })}
            />
          )}
        </div>
        <div className="general-report">
          {(eventsResource.loading || readingResource.loading) && loader}
          {(eventsResource.error || readingResource.error) && (
            <ErrorScreen
              error={(eventsResource.error ?? readingResource.error) as Error}
            />
          )}
          {eventsResource.data && readingResource.data && (
            <ReportTable
              events={eventsResource.data}
              readings={readingResource.data}
            />
          )}
        </div>
      </div>
    </>
  );
}
