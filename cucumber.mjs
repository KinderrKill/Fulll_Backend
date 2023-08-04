export default {
  paths: ['src/tests/features/*.feature'],
  requireModule: ['ts-node/register'],
  require: ['src/tests/**/*.ts'],
  publishQuiet: true,
};
