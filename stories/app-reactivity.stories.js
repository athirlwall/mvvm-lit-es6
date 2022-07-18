import { html } from 'lit';
import '../src/app-reactivity.js';

export default {
  title: 'AppReactivity',
  component: 'app-reactivity',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <app-reactivity
      style="--app-reactivity-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </app-reactivity>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
