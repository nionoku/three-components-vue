import { VNode } from "vue"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (story: VNode) => ({
    components: { story },
    template: `
      <div style="width: 600px; height: 400px; border: 1px dashed black">
        <story />
      </div>
    `
  })
]
