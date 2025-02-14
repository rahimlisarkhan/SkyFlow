import { Card, Col, Row, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import useCheckRole from "@/common/hooks/useCheckRole";
import { ROLE } from "@/common/constants/role";

const cardData = [
  { title: "Total Sales", value: 10000, icon: <ArrowUpOutlined /> },
  { title: "Income", value: 3000, icon: <ArrowUpOutlined /> },
  { title: "Total Orders", value: 1200, icon: <ArrowUpOutlined /> },
  { title: "Active Users", value: 1300, icon: <ArrowDownOutlined /> },
  { title: "Pending Orders", value: 200, icon: <ArrowDownOutlined /> },
  { title: "Completed Tasks", value: 900, icon: <ArrowUpOutlined /> },
  { title: "Refunds", value: 150, icon: <ArrowDownOutlined /> },
  { title: "Profit", value: 5000, icon: <ArrowUpOutlined /> },
];

const DashboardInfo = () => {
  const checkRole = useCheckRole([ROLE.ENTERPRISE]);

  return (
    <Row gutter={[16, 16]}>
      {cardData.map((card, index) => {
        const content = (
          <Col span={8} key={index}>
            <Card
              title={card.title}
              extra={
                card.value > 1000 ? (
                  <ArrowUpOutlined
                    style={{
                      color: "green",
                    }}
                  />
                ) : (
                  <ArrowDownOutlined
                    style={{
                      color: "red",
                    }}
                  />
                )
              }
              style={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Statistic value={card.value + " $"} />
            </Card>
          </Col>
        );

        if (index % 2 == 0) {
          // "even" data only show ENTERPRISE
          return checkRole(content);
        }

        return content;
      })}
    </Row>
  );
};

export default DashboardInfo;
