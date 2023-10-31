type ResultTableProps = {
  right: number;
  total: number;
};

export function ResultTable({ right, total }: ResultTableProps) {
  const step = Math.floor(100 / total);
  return (
    <table className="report-table border-0 shadow">
      <tbody className="text-start">
        <tr>
          <th className="corner top-left">Preguntas totales</th>
          <th className="total-questions">{total}</th>
        </tr>
        <tr>
          <th className="">
            <i className="bi bi-check colored-item color-green"></i>
            <span className="d-none d-md-inline mx-1 text-success">
              Correctas
            </span>
          </th>
          <th className="">
            <span className="d-none d-md-inline mx-1 correct-count">
              {right} <span className="multiplier"></span>
            </span>
          </th>
        </tr>
        <tr>
          <th className="corner top-right">
            <i className="bi bi-x colored-item color-red"></i>
            <span className="d-none d-md-inline mx-1 text-red">
              Incorrectas
            </span>
          </th>
          <th className="">
            <span className="d-none d-md-inline mx-1 incorrect-count">
              {total - right} <span className="multiplier"></span>
            </span>
          </th>
        </tr>
        <tr>
          <th className="corner top-right">
            <i className="bi bi-trophy-fill colored-item color-blue"></i>
            <span className="d-none d-md-inline mx-1 text-blue">Puntaje</span>
          </th>
          <th className="">
            <span className="d-none d-md-inline mx-1 total-score">
              {right * step}
              <span className="multiplier"></span>
            </span>
          </th>
        </tr>
      </tbody>
    </table>
  );
}
