import { Card, Col, Row } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const barOptions = {
  chart: {
    type: "bar",
  },
  title: {
    text: "Monthly Sales",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  yAxis: {
    title: {
      text: "Sales",
    },
  },
  series: [
    {
      name: "Sales",
      data: [65, 59, 80, 81, 56, 55, 40],
      color: "#4bc0c0",
    },
  ],
  credits: {
    enabled: false, // Disable Highcharts footer with highcharts.com link
  },
};

// Line Chart Data
const lineOptions = {
  chart: {
    type: "line",
  },
  title: {
    text: "Monthly Revenue",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  yAxis: {
    title: {
      text: "Revenue",
    },
  },
  series: [
    {
      name: "Revenue",
      data: [300, 400, 450, 500, 460, 550, 600],
      color: "#4bc0c0",
      marker: {
        symbol: "circle",
      },
    },
  ],
  credits: {
    enabled: false, // Disable Highcharts footer with highcharts.com link
  },
};

const ReportsContent = () => {
  return (
    <Row gutter={[16, 16]}>
      {/* Bar Chart */}
      <Col span={12}>
        <Card title="Monthly Sales" bordered={false}>
          <HighchartsReact highcharts={Highcharts} options={barOptions} />
        </Card>
      </Col>

      {/* Line Chart */}
      <Col span={12}>
        <Card title="Monthly Revenue" bordered={false}>
          <HighchartsReact highcharts={Highcharts} options={lineOptions} />
        </Card>
      </Col>
    </Row>
  );
};

export default ReportsContent;
