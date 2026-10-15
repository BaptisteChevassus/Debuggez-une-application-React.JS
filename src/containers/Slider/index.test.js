import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
  it("the cards are sorted from the most recent to the oldest", async () => {
    api.loadData = jest.fn().mockReturnValue({
      focus: [
        { title: "Mars", description: "", date: "2022-03-15T12:00:00.000Z", cover: "" },
        { title: "Janvier", description: "", date: "2022-01-15T12:00:00.000Z", cover: "" },
        { title: "Mai", description: "", date: "2022-05-15T12:00:00.000Z", cover: "" },
      ],
    });
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    const titles = await screen.findAllByRole("heading", { level: 3 });
    expect(titles.map((title) => title.textContent)).toEqual([
      "Mai",
      "Mars",
      "Janvier",
    ]);
  });
});
