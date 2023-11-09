import { IEventByWeek } from "@interfaces/event";
import { IReadingByWeek } from "@interfaces/reading";

type ReportTableProps = {
    events: IEventByWeek[];
    readings: IReadingByWeek[];
}

export function ReportTable({ events, readings }: ReportTableProps) {

  const readingLastWeek = readings.at(1)?.readingCount ?? 0;
  const readingCurrentWeek = readings.at(0)?.readingCount ?? 0;
  const readingProgress = (
    ((readingCurrentWeek - readingLastWeek) * 100) /
    (readingLastWeek + readingCurrentWeek)
  ).toFixed(2);

  const eventsLastWeek = events.at(1)?.eventCount ?? 0;
  const eventCurrentWeek = events.at(0)?.eventCount ?? 0;
  const eventProgress = (
    ((eventCurrentWeek - eventsLastWeek) * 100) /
    (eventsLastWeek + eventCurrentWeek)
  ).toFixed(2);

  return (
    <table className="report-table shadow py-3 px-2">
      <tr>
        <th className="corner top-left">Categoría</th>
        <th className="text-center">
          <i className="bi bi-arrow-left"></i>
          <span className="d-none d-md-inline mx-1">Anterior</span>
        </th>
        <th className="text-center">
          <i className="bi bi-calendar-check"></i>
          <span className="d-none d-md-inline mx-1">Última</span>
        </th>
        <th className="text-center corner top-right">
          <i className="bi bi-award"></i>
          <span className="d-none d-md-inline mx-1">Progreso</span>
        </th>
      </tr>
      <tbody>
        <tr>
          <td
            scope="row"
            className="px-4 report-cell report-accent color-green"
          >
            <i className="bi bi-book colored-item color-green"></i>
            Lectura
          </td>
          <td className="text-center">{readingLastWeek}</td>
          <td className="text-center">{readingCurrentWeek}</td>
          <td className="text-center">{readingProgress}</td>
        </tr>
        <tr>
          <td scope="row" className="px-4 report-cell report-accent">
            <i className="bi bi-puzzle-fill colored-item color-yellow"></i>
            Actividades
          </td>
          <td className="text-center">-</td>
          <td className="text-center">-</td>
          <td className="text-center">-</td>
        </tr>
        <tr>
          <td
            scope="row"
            className="px-4 report-cell report-accent corner bottom-left"
          >
            <i className="bi bi-calendar colored-item color-blue"></i>
            Eventos
          </td>
          <td className="text-center">{eventsLastWeek}</td>
          <td className="text-center">{eventCurrentWeek}</td>
          <td className="text-center corner bottom-right">{eventProgress}</td>
        </tr>
      </tbody>
    </table>
  );
}
