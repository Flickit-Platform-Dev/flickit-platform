// components/AssessmentReportPDF.tsx

import React, { FC, useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { toPng } from "html-to-image";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
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
  footerText: {
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
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  image: {
    width: 200,
    height: 200,
  },
  // Additional styles...
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

  useEffect(() => {
    if (summaryImage) {
      setChartImage(summaryImage);
    }
  }, [summaryImage]);

  const { status, assessment, subjects } = data || {};
  const { assessmentKit, maturityLevel, confidenceValue } = assessment || {};
  const { questionsCount, answersCount } = progress;

  const totalProgress = ((answersCount || 0) / (questionsCount || 1)) * 100;

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Assessment Report</Text>
      <Text style={styles.headerText}>
        Generated on: {new Date().toLocaleString()}
      </Text>
    </View>
  );

  const Footer = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Confidential Report</Text>
    </View>
  );

  // Determine sections count based on your data structure
  let sectionsCount = 1; // Default to at least one section

  // Example: Calculate sections based on array length
  if (subjects && Array.isArray(subjects)) {
    sectionsCount += subjects.length; // Add number of subjects as sections
  }

  return (
    <Document>
      {[...Array(sectionsCount)].map((_, index) => (
        <Page
          key={index}
          size="A4"
          style={styles.page}
          render={({ pageNumber, totalPages }: any) => (
            <>
              <Header />
              <View style={styles.section}>
                <Text style={styles.title}>Assessment Report</Text>
                <Text style={styles.subtitle}>General</Text>
                {chartImage && <Image style={styles.image} src={chartImage} />}
                <View style={styles.divider} />
                <Text style={styles.subtitle}>Overall Status</Text>
                <View style={styles.divider} />
                {/* Render additional dynamic content here */}
                {/* Example: Render subject-specific content */}
                {subjects && subjects[index] && (
                  <>
                    <Text style={styles.subtitle}>
                      Subject: {subjects[index].name}
                    </Text>
                    <Text>Details: {subjects[index].details}</Text>
                    {/* Additional content for each subject */}
                  </>
                )}
                <View style={styles.divider} />
                <Text style={styles.subtitle}>Advices</Text>
              </View>
              <Footer />
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
      ))}
    </Document>
  );
};

export default AssessmentReportPDF;
