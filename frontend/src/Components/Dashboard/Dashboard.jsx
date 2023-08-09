import { useEffect, useRef, useState } from "react";
import { Box, Flex, SimpleGrid, Spacer, Select, Text } from "@chakra-ui/react";
import DashboardTop from "./DashboardTop";
import { KeyIndicators } from "./keyIndicators";
import Chart from "chart.js/auto";

const keyIndicatorData = [
  { name: "Successful Cases", value: 100 },
  { name: "Leads", value: 55 },
  { name: "Requests", value: 150 },
  { name: "New Customers", value: 224 },
];

const Dashboard = () => {
  const chartRef = useRef(null);
  const [selectedChart, setSelectedChart] = useState("bar");

  useEffect(() => {
    const chartConfig = {
      type: selectedChart,
      data: {
        labels: keyIndicatorData.map((item) => item.name),
        datasets: [
          {
            label: "Number of Cases",
            data: keyIndicatorData.map((item) => item.value),
            backgroundColor: [
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(255, 205, 86, 0.8)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 205, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
          },
        },
      },
    };

    const chartInstance = new Chart(chartRef.current, chartConfig);

    return () => {
      chartInstance.destroy();
    };
  }, [selectedChart]);

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  return (
    <Box p={10} bg="white" boxShadow="xl" borderRadius="lg">
      <DashboardTop />

      <Box mt={8} bg="white" p={6} borderRadius="md" boxShadow="md">
        <Flex align="center">
          <Text fontWeight="bold" fontSize="lg" color="gray.700">
            Key Indicators
          </Text>
          <Spacer />
          <Select
            w={200}
            cursor="pointer"
            value={selectedChart}
            onChange={handleChartChange}
          >
            <option value="bar">Select Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
          </Select>
        </Flex>

        <SimpleGrid columns={[1, 2, 4]} spacing={6} mt={4}>
          {keyIndicatorData.map((item, index) => (
            <KeyIndicators key={index} name={item.name} value={item.value} />
          ))}
        </SimpleGrid>
      </Box>

      <Box mt={8} bg="white" borderRadius="md" boxShadow="md">
        <canvas
          ref={chartRef}
          style={{ width: "100%", height: "400px", minHeight: "300px" }}
        ></canvas>
      </Box>
    </Box>
  );
};

export default Dashboard;
