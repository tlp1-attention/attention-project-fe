import { Chart as ChartJS,Tooltip, Legend } from "chart.js";
import { BarElement, LineElement } from "chart.js/auto";
import { useId } from "react";
import { Chart, ChartProps } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, BarElement, LineElement);

type ChartData<T> = {
  data: T[];
  labels: string[];
  chartLabel: string;
  backgroundColor?: string;
};

type ReportChartProps<T> = ChartData<T> & {
    type: ChartProps["type"];
}

export function ReportChart<T>({
  data,
  chartLabel,
  labels,
  backgroundColor = "#2c87e2",
  type
}: ReportChartProps<T>) {
  const id = useId();

  return (
    <Chart
      key={id}
      type={type}
      data={{
        datasets: [
          {
            label: chartLabel,
            data,
            backgroundColor
          }
        ],
        labels
      }}
    />
  );
}
