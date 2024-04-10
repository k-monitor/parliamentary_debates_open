import React from "react";
import { Button } from "react-bootstrap";
import jsonexport from "jsonexport";
import { fetchData } from "./store/modules/search";

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

    const search = this.props.search;
    const totalValue = this.props.search.results.hits.total.value;

    const csvData = [];

    try {
      const response = await fetchData(search, totalValue);

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
