import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**", "build/**", "public/**", "next-env.d.ts"] },
  ...compat.config({
    extends: ["next/core-web-vitals", "plugin:jsx-a11y/recommended"],
    rules: { "react/no-unescaped-entities": "off" },
  }),
];

export default eslintConfig;
