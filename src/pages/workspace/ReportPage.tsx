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
import { Await } from "@common/components/Await";

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

  return (
    <>
      <h1>Reporte de {user?.name}</h1>
      <div className="chart-container fs-4">
        <div className="event-report shadow">
          <Await value={eventsResource}>
            {data => (
              <ReportChart
                type="bar"
                data={data.map(e => e.eventCount)}
                chartLabel="Eventos registrados por semana"
                labels={data.map(group => {
                  const startWeekDate = dayjs(group.startWeek).format("DD/MM");
                  const endWeekDate = dayjs(group.endWeek).format("DD/MM");
                  return `${startWeekDate} - ${endWeekDate}`;
                })}
              />
            )}
          </Await>
        </div>
        <div className="reading-report shadow">
          <Await value={readingResource}>
            {data => (
              <ReportChart
                type="line"
                data={data.map(e => e.readingCount)}
                chartLabel="Ejercicios completados por semana"
                labels={data.map(group => {
                  const startWeekDate = dayjs(group.startWeek).format("DD/MM");
                  const endWeekDate = dayjs(group.endWeek).format("DD/MM");
                  return `${startWeekDate} - ${endWeekDate}`;
                })}
              />
            )}
          </Await>
        </div>
        <div className="general-report">
          {(eventsResource.loading || readingResource.loading) && loader}
          {(eventsResource.error || readingResource.error) && (
            <ErrorScreen
              error={(eventsResource.error ?? readingResource.error) as Error}
            />
          )}
          <Await value={[readingResource, eventsResource]}>
            {([readingData, eventData]) =>
              eventsResource.data &&
              readingResource.data && (
                <ReportTable
                  events={eventsResource.data}
                  readings={readingResource.data}
                />
              )
            }
          </Await>
        </div>
      </div>
    </>
  );
}
