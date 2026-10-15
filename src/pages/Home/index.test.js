import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


const data = {
  focus: [],
  events: [
    {
      id: 1,
      type: "conférence",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 site web dédié"],
    },
    {
      id: 2,
      type: "soirée entreprise",
      date: "2022-08-29T20:28:45.744Z",
      title: "Sneakercraze market",
      cover: "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png",
      description: "Rencontres de spécialistes des Sneakers Européens.",
      nb_guesses: 900,
      periode: "15-16 Août",
      prestations: ["1 espace d’exposition"],
    },
  ],
};

describe("When a page is created", () => {
  beforeEach(() => {
    api.loadData = jest.fn().mockReturnValue(data);
  });

  it("a list of events is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    const events = within(document.querySelector("#nos-realisations"));
    expect(await events.findByText("Conférence #productCON")).toBeInTheDocument();
    expect(events.getByText("Sneakercraze market")).toBeInTheDocument();
  });
  it("a list a people is displayed", () => {
    render(<Home />);
    const team = within(document.querySelector("#notre-equipe"));
    ["Samira", "Jean-baptiste", "Alice", "Luís", "Christine", "Isabelle"].forEach(
      (name) => expect(team.getByText(name)).toBeInTheDocument()
    );
  });
  it("a footer is displayed", () => {
    render(<Home />);
    const footer = within(screen.getByRole("contentinfo"));
    expect(footer.getByText("Contactez-nous")).toBeInTheDocument();
    expect(
      footer.getByText("45 avenue de la République, 75000 Paris")
    ).toBeInTheDocument();
    expect(footer.getByText("contact@724events.com")).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    const footer = within(screen.getByRole("contentinfo"));
    expect(await footer.findByText("Sneakercraze market")).toBeInTheDocument();
    expect(footer.getByText("août")).toBeInTheDocument();
    expect(footer.getByText("soirée entreprise")).toBeInTheDocument();
  });
});
