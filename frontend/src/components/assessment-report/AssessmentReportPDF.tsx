import React, { FC, useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import html2canvas from "html2canvas";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#000",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  headerText: {
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  description: {
    fontSize: 12,
    margin: 12,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    width: "33.33%", // Adjusted to three columns
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#ccc", // Header background color
    color: "#000", // Header text color
  },
  tableCell: {
    width: "33.33%", // Adjusted to three columns
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    padding: 5,
    textAlign: "center",
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  image: {
    width: 200,
    height: 200,
  },
  chart: {
    width: 300,
    height: 200,
  },
});

interface AssessmentReportPDFProps {
  data: any;
  progress: any;
  summaryImage?: any; // Expecting a data URL for the summaryImage
}

const AssessmentReportPDF: FC<AssessmentReportPDFProps> = ({
  data,
  progress,
  summaryImage,
}) => {
  const [chartImage, setChartImage] = useState<string | null>(null);
  const [maturityGauge, setMaturityGauge] = useState<string | null>(null);

  useEffect(() => {
    const generateImage = async () => {
      const chartInstance =
        document.querySelector(".recharts-wrapper")?.parentNode?.parentNode
          ?.parentNode;

      if (!chartInstance) return;

      try {
        const canvas = await html2canvas(chartInstance);
        const dataUrl = canvas.toDataURL("image/png");
        setChartImage(dataUrl);
      } catch (error) {
        console.error("Error generating image from HTML:", error);
      }
    };

    const generateImage2 = async () => {
      const chartInstance = document.querySelector(".insight--report__gauge")
        ?.parentNode?.parentNode?.parentNode?.parentNode;

      console.log(chartInstance);
      if (!chartInstance) return;

      try {
        const canvas = await html2canvas(chartInstance);
        const dataUrl = canvas.toDataURL("image/png");
        setMaturityGauge(dataUrl);
      } catch (error) {
        console.error("Error generating image from HTML:", error);
      }
    };
    setTimeout(generateImage, 5000);
    setTimeout(generateImage2, 5000);
  }, [summaryImage]);

  const { status, assessment, subjects } = data || {};
  const { assessmentKit, maturityLevel, confidenceValue } = assessment || {};
  const { questionsCount, answersCount } = progress;

  const totalProgress = ((answersCount || 0) / (questionsCount || 1)) * 100;

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{assessment.title} Report</Text>
      <Text style={styles.headerText}>
        Generated on: {new Date().toLocaleString()}
      </Text>
    </View>
  );

  // Render subjects as a table
  const renderSubjectsTable = () => {
    if (!subjects || subjects.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.title}>Subjects Table</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Subject Name</Text>
            <Text style={styles.tableCellHeader}>Description</Text>
            <Text style={styles.tableCellHeader}>Maturity Level</Text>
          </View>

          {/* Table Body */}
          {subjects.map((subject: any) => (
            <View key={subject.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{subject.title}</Text>
              <Text style={styles.tableCell}>{subject.description}</Text>
              <Text style={styles.tableCell}>
                {subject.maturityLevel.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Document>
      {/* First Page */}
      <Page
        size="A4"
        style={styles.page}
        render={({ pageNumber, totalPages }: any) => (
          <>
            <Header />
            <View style={styles.section}>
              <Text style={styles.title}>Assessment Insights</Text>
              <Text style={styles.subtitle}>General</Text>
              <Text style={styles.description}>
                In this part of the report, you can see the maturity level
                status.
              </Text>
              {maturityGauge && (
                <Image style={styles.image} src={maturityGauge} />
              )}
              <View style={styles.divider} />
              <Text style={styles.subtitle}>Chart</Text>
              {chartImage && <Image style={styles.chart} src={chartImage} />}
            </View>
            <Text
              style={{
                position: "absolute",
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 10,
              }}
            >
              Page {pageNumber} of {totalPages}
            </Text>
          </>
        )}
      />

      {/* Second Page */}
      <Page
        size="A4"
        style={styles.page}
        render={({ pageNumber, totalPages }: any) => (
          <>
            <Header />
            <View style={styles.section}>
              {/* Render additional dynamic content here */}
              {renderSubjectsTable()}
            </View>
            <Text
              style={{
                position: "absolute",
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 10,
              }}
            >
              Page {pageNumber} of {totalPages}
            </Text>
          </>
        )}
      />
    </Document>
  );
};

export default AssessmentReportPDF;
