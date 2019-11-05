import React from "react";
import { shallow } from "enzyme";
import { createMemoryHistory } from "history";
import App from "./App";
const history = createMemoryHistory();

describe("<App /> rendering", () => {
  it("should render App with router", () => {
    let wrapper = shallow(<App history={history} />);

    expect(wrapper.find("div").hasClass("app")).toBe(true);
    expect(wrapper.find("Header").length).toBe(1);
    expect(wrapper.find("Switch").length).toBe(1);
    expect(wrapper.find("Route").length).toBe(3);
  });
});
