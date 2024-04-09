import React from "react";
import { Button } from "react-bootstrap";
import jsonexport from "jsonexport";
import config from "./config.json";

class ExportCSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleExportCSV = async () => {
    this.setState({ loading: true });

    const queryParams = new URLSearchParams(window.location.search);
    const term = queryParams.get("term");
    const speakerFilter = queryParams.get("speaker_filter");
    const typeFilter = queryParams.get("type_filter");
    const dateFilter = queryParams.get("date_filter");
    const startDate = queryParams.get("start_date");
    const endDate = queryParams.get("end_date");

    const csvData = [];

    const page = 0;
    const start = page * config.page_size;

    const requestBody = {
      id: config.QUERY_NAME,
      params: {
        q: term,
        size: this.props.results.hits.total.value,
        from: start,
        ...(speakerFilter ? { "filter.speakers": [speakerFilter] } : {}),
        ...(typeFilter ? { "filter.types": [typeFilter] } : {}),
        ...(dateFilter ? { "filter.date": dateFilter } : {}),
        ...(startDate
          ? { "filter.date.from": startDate }
          : { "filter.date.from": "1900.01.01." }),
        ...(endDate
          ? { "filter.date.to": endDate }
          : { "filter.date.to": "2500.01.01." }),
      },
    };

    try {
      const response = await fetch(config.SEARCH_API, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }

      const searchData = await response.json();

      searchData.hits.hits.forEach((hit) => {
        csvData.push({
          Felszólaló: hit._source.speaker,
          Téma: Array.isArray(hit._source.topic)
            ? hit._source.topic.join(", ")
            : hit._source.topic,
          "Felszólalás oka": hit._source.type,
          Dátum: hit._source.date,
          Ülésszak: hit._source.session,
          "Ülés jellege": hit._source.sitting_type,
          Szöveg: hit._source.text,
        });
      });

      jsonexport(csvData, (err, csv) => {
        if (err) return console.error(err);
        const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `keresés eredménye - ${term}.csv`);
        document.body.appendChild(link);
        link.click();
      });

      this.setState({ loading: false });
    } catch (error) {
      console.error("Error exporting CSV:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Button onClick={this.handleExportCSV} disabled={loading}>
          Találatok Exportálása (CSV)
        </Button>
        <p
          style={{
            fontSize: "14px",
            fontStyle: "italic",
            margin: "0",
            display: loading ? "none" : "block",
          }}
        >
          A rendszer jelenleg 1000 sort képes exportálni. Használj szűrőt a
          találatok csökkentésére!
        </p>
        <p
          style={{
            fontSize: "14px",
            fontStyle: "italic",
            margin: "5px 0",
            color: "#888",
            display: loading ? "block" : "none",
          }}
        >
          Exportálás folyamatban...
        </p>
      </div>
    );
  }
}

export default ExportCSV;
