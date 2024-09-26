import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: {
    index: './src/index.ts',
  },
  sourcemap: true,
  skipNodeModulesBundle: true,
  format: ['esm', 'cjs'],
  noExternal: ['@iguanadex/utils'],
  dts: true,
  clean: !options.watch,
  treeshake: true,
  splitting: true,
}))
