import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import Home from "@/pages/index";
import { data } from "@/__tests__/__mocks__/mockData";

test("Home page renders correctly", async () => {
  render(<Home />);
  await waitForElementToBeRemoved(() =>
    screen.getByRole("heading", {
      name: /Fetching Books Data/i,
    })
  );

  const cardButtons = await screen.findAllByRole('button', {
    name: /Read More/i
  });
  expect(cardButtons).toHaveLength(data.length);
});
