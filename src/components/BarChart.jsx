import React from "react";

const BarChart = ({ title, statistics }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [data, setData] = React.useState([
    { name: "0", value: 0 },
    { name: "0 < % <= 10", value: 0 },
    { name: "10 < % <= 20", value: 0 },
    { name: "20 < % <= 30", value: 0 },
    { name: "30 < % <= 40", value: 0 },
    { name: "40 < % <= 50", value: 0 },
    { name: "50 < % <= 60", value: 0 },
    { name: "60 < % <= 70", value: 0 },
    { name: "70 < % <= 80", value: 0 },
    { name: "80 < % <= 90", value: 0 },
    { name: "90 < % < 100", value: 0 },
    { name: "100", value: 0 },
  ]);

  React.useEffect(() => {
    if (!loaded) {
      Object.values(statistics).forEach((value, i) => {
        const pct = value.pctWordsFound * 100;
        let dataIndex = -1;

        if (pct === 0) {
          dataIndex = 0;
        } else if (0 < pct && pct <= 10) {
          dataIndex = 1;
        } else if (10 < pct && pct <= 20) {
          dataIndex = 2;
        } else if (20 < pct && pct <= 30) {
          dataIndex = 3;
        } else if (30 < pct && pct <= 40) {
          dataIndex = 4;
        } else if (40 < pct && pct <= 50) {
          dataIndex = 5;
        } else if (50 < pct && pct <= 60) {
          dataIndex = 6;
        } else if (60 < pct && pct <= 70) {
          dataIndex = 7;
        } else if (70 < pct && pct <= 80) {
          dataIndex = 8;
        } else if (80 < pct && pct <= 90) {
          dataIndex = 9;
        } else if (90 < pct && pct <= 100) {
          dataIndex = 10;
        } else if (pct === 100) {
          dataIndex = 11;
        }

        let tempData = data;
        tempData[dataIndex].value = tempData[dataIndex].value + 1;
        setData(tempData);
      });

      setLoaded(true);
    }
  }, [data, loaded, statistics]);

  return <Graph data={data} graphTitle={title} />;
};

const Graph = ({ data, graphTitle }) => {
  const renderLines = () => {
    return Array(10)
      .fill(null)
      .map((el, i) => <Line left={i * 10} key={i} />);
  };

  const renderBars = () => {
    let allData = data.reduce((acc, d) => {
      return acc + d.value;
    }, 0);

    return data.map((d) => {
      const percent = (d.value / allData) * 100;
      return (
        <Bar
          value={d.value}
          percent={percent}
          height={(1 / data.length) * 100}
          key={d.name}
        />
      );
    });
  };

  return (
    <div className="graph-wrapper">
      <h2 className="graph-title">{graphTitle} </h2>

      <div className="graph">
        <BarTextContent data={data} />

        <div className="column w-full">
          <div className="bar-lines-container">
            {renderLines()}
            {renderBars()}
          </div>

          <Markers />
        </div>
      </div>

      <h3 className="graph-x-axis-text">
        % of Days in Each Range (# of Days in Each Bar)
      </h3>
    </div>
  );
};

const Markers = () => {
  const markerArr = Array(11).fill(null);

  return (
    <div className="markers">
      {markerArr.map((el, i) => (
        <span className="marker" key={i} style={{ left: `${i * 10}%` }}>
          {i * 10}
        </span>
      ))}
    </div>
  );
};

const Bar = ({ value, percent, height }) => {
  return (
    <div className="bar" style={{ width: `${percent}%`, height: `${height}%` }}>
      {value > 0 && <label className="float-right pr-1 pt-1">{value}</label>}
    </div>
  );
};

const BarTextContent = ({ data }) => {
  return (
    <div className="bar-text-content">
      {data.map((d, i) => (
        <div
          className="bar-text"
          style={{
            height: `${(1 / data.length) * 100}%`,
          }}
          key={i}
        >
          {d.name}
        </div>
      ))}
    </div>
  );
};

const Line = ({ left }) => {
  return <div className="line" style={{ left: `${left}%` }} />;
};

export default BarChart;
