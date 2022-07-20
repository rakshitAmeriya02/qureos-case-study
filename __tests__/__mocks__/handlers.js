import { rest } from "msw";
import { API_ENDPOINT } from "@/utils/constant";
import { data } from "@/__tests__/__mocks__/mockData";

export const handlers = [
  rest.get(API_ENDPOINT, (_, res, ctx) => {
    return res(ctx.json(data));
  }),
];
