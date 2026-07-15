const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const credentials = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
);

const client = new BetaAnalyticsDataClient({
  credentials,
});

async function runReport() {
  const [response] = await client.runReport({
    property: `properties/${process.env.GA4_PROPERTY_ID}`,

    dateRanges: [
      {
        startDate: "today",
        endDate: "today",
      },
    ],

    metrics: [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
    ],
  });

  console.log("Today's GA4 Report");
  console.log("-------------------");

  response.metricHeaders.forEach((metric, index) => {
    console.log(
      `${metric.name}: ${response.rows[0].metricValues[index].value}`
    );
  });
}

runReport().catch(console.error);