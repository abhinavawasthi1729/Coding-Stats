import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Heatmap from "./Heatmap";

const Container = styled.div`
  background-color: rgba(
    ${(props) => props.theme.textRgba},
    ${(props) => (props.theme.dark ? 0.1 : 0.04)}
  );
  //height: 500px;
  width: 90%;
  margin: 0px auto;
  border-radius: 10px;
  padding: 30px 50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media screen and (max-width: 1100px) {
    padding: 10px;
    overflow: hidden;
  }
`;

const Top = styled.div`
  //height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 670px) {
    flex-direction: column;
  }

  .first {
    display: flex;
    background: ${(props) => props.theme.backgroundGradient};
    padding: 10px;
    height: 100%;
    border-radius: 5px;

    @media screen and (max-width: 670px) {
      width: 100%;
      margin-bottom: 5px;
      justify-content: space-around;
    }
  }

  .img {
    height: 120px;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
  }

  //
  img {
    width: 100px;
    //height: 100%;
    margin-bottom: 10px;
  }

  a {
    color: ${(props) => props.theme.accent};
    cursor: pointer;
  }
  .mid {
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    //width: calc(100% - 160 - 40%);

    p {
      margin: 0;
    }
  }
`;

const Text = styled.div`
  //height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  //margin-left: 40px;

  width: fit-content;

  background: ${(props) => props.theme.backgroundGradient};
  padding: 10px;

  @media screen and (max-width: 670px) {
    width: 100%;
    justify-content: center;
    > div {
      margin: 0 10px;
    }
  }

  .left {
    //background-color: red;
    height: 100%;
    //width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }

  canvas {
    height: 100%;
    width: 100%;
  }

  .right {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    column-gap: 20px;
    font-weight: lighter;
  }

  color: ${(props) => props.theme.text};
  //font-weight: 600;

  .school {
    color: #47e9b8;
  }

  .basic {
    color: #68a331;
  }

  .easy {
    color: #008f40;
  }

  .medium {
    color: #d39b00;
  }

  .hard {
    color: #ff6600;
  }
`;

const HeatMap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  //height: 100%;
  width: 100%;
  flex: 4;
  overflow: scroll;
  padding: 10px;

  svg {
    height: 100%;
    width: 100%;
  }
`;

const MiniStat = ({ platform, heatmap, siteLogo }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [],
    datasets: [
      {
        label: ["Solved"],
        data: platform?.submissionCount?.map((sub) => {
          if (platform?.submissionCount?.length == 1) return sub.count;
          else {
            if (sub.difficulty !== "All") return sub.count;
          }
        }),
        backgroundColor: [
          "#47e9b8",
          "#aff072",
          "#008f40",
          "#ffe600",
          "#ff6600",
        ],
        borderColor: ["#47e9b8", "#aff072", "#008f40", "#ffe600", "#ff6600"],
      },
    ],
  };

  const options = {};

  return (
    <Container>
      <Top>
        <div className="first">
          <div className="img">
            <img src={siteLogo} alt="logo" className="site" />
            <a target="_blank" href={platform?.profileLink}>
              Go to site
            </a>
          </div>

          <div className="mid">
            <h2>{platform?.handler}</h2>
            <p>
              <span className="heading">Platform: </span>
              {platform?.platformName}
            </p>
            <p>
              <span className="heading">
                {platform?.platformName === "CODEFORCES"
                  ? "Rating: "
                  : "Rank: "}
              </span>
              {platform?.rank}
            </p>
            <p>
              <span className="heading">Streak: </span>
              {platform?.streak}
            </p>
          </div>
        </div>

        <Text>
          <div className="left">
            <Doughnut
              data={data}
              options={options}
              style={{ width: "125px" }}
            />
          </div>
          <div className="right">
            {platform?.submissionCount?.map((sub) => (
              <span
                key={sub.difficulty}
                className={sub?.difficulty?.toLowerCase()}
              >
                {`${sub.difficulty}: ${sub.count}`}
              </span>
            ))}
          </div>
        </Text>
      </Top>
      <HeatMap>
        {heatmap && <Heatmap heatmapData={heatmap?.heatmapData} year={new Date().getFullYear()} />}
      </HeatMap>
    </Container>
  );
};

export default MiniStat;
