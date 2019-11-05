import { withNaming } from "@bem-react/classname";

type BemModifiers = Record<string, string | number | boolean>;

const classes = (block: string) => (
  element?: string,
  modifier?: BemModifiers
) => {
  const cn = withNaming({ e: "__", m: "--", v: "--" });
  const bem = cn(block);
  return bem(element, modifier);
};

export default classes;
