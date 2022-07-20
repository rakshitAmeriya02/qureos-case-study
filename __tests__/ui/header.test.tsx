import { render, screen } from "@testing-library/react";

import Header from "@/components/HeaderBar";
import { TEXT } from "@/utils/constant";

test("Page has correct heading", () => {
  render(<Header />);
  const heading = screen.getByRole('button');
  expect(heading).toHaveTextContent(TEXT.HOME);
  expect(heading).toBeInTheDocument();
});
