import { fireEvent, render, screen } from "@testing-library/react";

import LazyImage from "@/ui-core/LazyImage";
import { data } from "@/__tests__/__mocks__/mockData";
import { TEXT } from "@/utils/constant";

test("LazyImage shows placeholder until image loads", async () => {
  const imageData = data[0];
  render(
    <LazyImage alt={imageData.title} src={imageData.thumbnailUrl || null} />
  );
  const imageElement = screen.getByRole("img", {
    name: imageData.title,
  });
  const placeholderImage = screen.getByTestId("book-icon");
  const noCoverText = screen.queryByText(TEXT.NO_COVER_AVAILABLE);

  expect(imageElement).toBeInTheDocument();
  expect(placeholderImage).toBeInTheDocument();
  expect(noCoverText).toBeInTheDocument();

  expect(imageElement).toHaveClass("invisible");
  expect(placeholderImage).toHaveClass("visible");

  fireEvent.load(imageElement);

  expect(imageElement).not.toHaveClass("invisible");
  expect(placeholderImage).toHaveClass("hidden");
});

test("LazyImage without placeholder", async () => {
  const imageData = data[0];
  render(
    <LazyImage
      alt={imageData.title}
      hideNoContentText
      src={imageData.thumbnailUrl || null}
    />
  );
  const imageElement = screen.getByRole("img", {
    name: imageData.title,
  });
  const placeHolderText = screen.queryByText(TEXT.NO_COVER_AVAILABLE);

  expect(imageElement).toBeInTheDocument();
  expect(placeHolderText).not.toBeInTheDocument();
});

test("LazyImage shows placeholder in case of error", async () => {
  const imageData = data[0];
  render(
    <LazyImage alt={imageData.title} src={imageData.thumbnailUrl || null} />
  );
  const imageElement = screen.queryByRole("img", {
    name: imageData.title,
  });

  expect(imageElement).toBeInTheDocument();
  fireEvent.error(imageElement!);
  expect(imageElement).not.toBeInTheDocument();
  const placeholderImage = screen.getByTestId("book-icon");
  expect(placeholderImage).toBeVisible();
});

test("LazyImage shows placeholder only in case null src", async () => {
  const imageData = data[0];
  render(
    <LazyImage alt={imageData.title} src={null} />
  );
  const imageElement = screen.queryByRole("img", {
    name: imageData.title,
  });

  expect(imageElement).not.toBeInTheDocument();
});
